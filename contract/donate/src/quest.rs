use crate::*;

pub type QuestId = String;

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct Quest {
    pub id: QuestId,
    pub challenger: AccountId,
    pub pool_id: PoolId,
    pub description: String,
    pub amount: Balance,
    pub vote_threshold: u64,
    pub voter_ids: Vector<AccountId>,
}

#[near_bindgen]
impl Donap {
    #[payable]
    pub fn create_quest(&mut self, streamer_id: AccountId, id: String, description: String) {
        let id = env::block_timestamp().to_string();
        assert!(self.quest_by_id.get(&id).is_none(), "Quest already existed");
        let pool_id = format!("{}.pool", streamer_id);
        let mut pool = self
            .pool_by_id
            .get(&pool_id)
            .expect("Streamer have not created pool yet");
        assert!(
            pool.challenger_of_quest.len() <= MAXIMUM_QUESTS,
            "Pool doesn't have enough slot"
        );
        let amount = env::attached_deposit();
        let vote_threshold: u64 = yton(amount * 2) as u64;
        assert!(vote_threshold >= 2, "Need to deposit at least 1 NEAR");
        let challenger = env::predecessor_account_id();

        let timestamp = env::block_timestamp().to_string();

        let quest = Quest {
            id: id.clone(),
            pool_id: pool_id.clone(),
            challenger: challenger.clone(),
            amount,
            description,
            vote_threshold,
            voter_ids: Vector::new(timestamp.as_bytes()),
        };

        self.quest_by_id.insert(&id, &quest);
        pool.challenger_of_quest.insert(&id, &challenger);
        self.pool_by_id.insert(&pool_id, &pool);
    }

    pub fn reject_quest(&mut self, quest_id: QuestId) {
        let quest = self
            .quest_by_id
            .remove(&quest_id)
            .expect("Quest doesn't exist");

        let mut pool = self
            .pool_by_id
            .get(&quest.pool_id)
            .expect("Pool doesn't exist");

        let streamer_id = pool.streamer_id.clone();
        let predecessor = env::predecessor_account_id();
        assert_eq!(streamer_id, predecessor, "Only streamer can reject quest");

        Promise::new(quest.challenger.clone()).transfer(quest.amount.clone());

        pool.challenger_of_quest.remove(&quest_id);

        self.pool_by_id.insert(&pool.id, &pool);
    }

    pub fn vote_quest(&mut self, quest_id: QuestId) {
        // get quest info
        let mut quest = self
            .quest_by_id
            .get(&quest_id)
            .expect("This quest doesn't exist");

        let mut voter_ids = quest.voter_ids;
        let current_voter_id = env::predecessor_account_id();

        // number of voters must be less than threshold
        assert!(
            voter_ids.len() < quest.vote_threshold,
            "The quest has enough votes."
        );

        let voter_exists = self
            .quest_by_id
            .get(&quest_id)
            .unwrap()
            .voter_ids
            .iter()
            .find(|voter_id| voter_id == &current_voter_id);

        assert_eq!(voter_exists, None, "You already voted");

        // add voter into quest
        voter_ids.push(&current_voter_id);

        // check whether the voter is final
        if voter_ids.len() == quest.vote_threshold {
            // if voter is final person
            // 1. remove quest in quest_by_id
            self.quest_by_id
                .remove(&quest_id)
                .expect("This quest doesn't exist");

            // 2. remove quest from pool in pool_by_id
            let pool_id = quest.pool_id;

            let mut pool = self.pool_by_id.get(&pool_id).expect("Pool doesn't exist");
            pool.challenger_of_quest.remove(&quest_id);

            self.pool_by_id.insert(&pool_id, &pool);

            // 4. pick a random voter
            let index = random_number(voter_ids.len());
            let lucky_voter = voter_ids.get(index).expect("Index is out of range");

            // // 3. transfer amount to streamer and one luckily voter
            let streamer_id = pool.streamer_id;
            self.internal_transfer(streamer_id, quest.amount, lucky_voter);
        } else {
            quest.voter_ids = voter_ids;
            self.quest_by_id.insert(&quest_id, &quest);
        }
    }

    pub fn get_vote_percentage(&self, quest_id: QuestId) -> U64 {
        let quest = self
            .quest_by_id
            .get(&quest_id)
            .expect("Quest Id doesn't exit");

        let current_vote = quest.voter_ids.len();

        U64::from(current_vote / quest.vote_threshold)
    }

    pub fn get_vote_threshold(&self, quest_id: QuestId) -> U64 {
        let quest = self
            .quest_by_id
            .get(&quest_id)
            .expect("Quest Id doesn't exit");

        U64::from(quest.vote_threshold)
    }
}
