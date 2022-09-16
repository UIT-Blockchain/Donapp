use crate::*;

pub type QuestId = String;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Quest {
    pub id: QuestId,
    pub pool_id: PoolId,
    pub name: String,
    pub description: String,
    pub amount: Balance,
    pub vote_threshold: u64,
    pub voter_ids: Vector<AccountId>,
}

#[near_bindgen]
impl Donap {
    pub fn create_quest(&mut self) {}

    pub fn reject_quest(&mut self) {}

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
            pool.quest_by_challenger.remove(&quest_id);

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
