use crate::*;

pub type PoolId = String;

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct Pool {
    pub id: PoolId,
    pub streamer_id: AccountId,
    pub deposit: Balance,
    pub expired_at: u64,
    pub challenger_of_quest: UnorderedMap<QuestId, AccountId>,
}

#[near_bindgen]
impl Donap {
    #[payable]
    pub fn create_pool(&mut self) {
        let streamer_id = env::predecessor_account_id();
        let pool_id = format!("{}.pool", streamer_id);

        assert!(
            self.pool_by_id.get(&pool_id).is_none(),
            "Pool already exists"
        );

        let id = pool_id.clone();
        let key_prefix = &(pool_id).as_bytes();
        let attached_deposit = env::attached_deposit();
        let require_deposit = ntoy(25);
        assert!(attached_deposit >= require_deposit);
        let pool = Pool {
            id,
            streamer_id: streamer_id.clone(),
            deposit: require_deposit,
            expired_at: env::epoch_height() + 2,
            challenger_of_quest: UnorderedMap::new(*key_prefix),
        };

        if attached_deposit > require_deposit {
            Promise::new(streamer_id.clone()).transfer(attached_deposit - require_deposit);
        }

        self.pool_by_id.insert(&pool_id, &pool);
    }

    pub fn delete_pool(&mut self, pool_id: PoolId) -> bool {
        let predecessor = env::predecessor_account_id();
        let pool = self.pool_by_id.get(&pool_id).expect("Pool doesn't exist");

        let is_challenger = pool
            .challenger_of_quest
            .values()
            .find(|challenger| challenger == &predecessor)
            .is_some();

        if predecessor == pool.streamer_id {
            Promise::new(pool.streamer_id.clone()).transfer(pool.deposit);
            for (quest_id, account_id) in pool.challenger_of_quest.iter() {
                let quest = self
                    .quest_by_id
                    .get(&quest_id)
                    .expect("Quest doesn't exist");
                Promise::new(account_id).transfer(quest.amount);
                self.quest_by_id.remove(&quest_id);
            }
            self.pool_by_id.remove(&pool.id);
            return true;
        }
        if is_challenger {
            assert!(
                pool.expired_at <= env::epoch_height(),
                "Challengers can only delete when quest expired"
            );
            let num_of_quest = pool.challenger_of_quest.len();
            let fee_per_quest = pool.deposit * 20 / 100 / num_of_quest as u128;

            Promise::new(pool.streamer_id.clone()).transfer(pool.deposit * 80 / 100);
            for (quest_id, account_id) in pool.challenger_of_quest.iter() {
                let quest = self
                    .quest_by_id
                    .get(&quest_id)
                    .expect("Quest doesn't exist");
                Promise::new(account_id).transfer(quest.amount + fee_per_quest);
                self.quest_by_id.remove(&quest_id);
            }
            self.pool_by_id.remove(&pool.id);
            return true;
        }
        false
    }
}
