use near_sdk::Promise;

use crate::*;

pub type PoolId = String;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Pool {
    pub id: PoolId,
    pub streamer_id: AccountId,
    pub deposit: Balance,
    pub maximum_quests: u64,
    pub expired_at: u64,
    pub quest_by_challenger: UnorderedMap<QuestId, AccountId>,
}

#[near_bindgen]
impl Donap {
    #[payable]
    pub fn create_pool(&mut self) -> Pool {
        let streamer_id = env::predecessor_account_id();
        let pool_id = format!("{}.pool", streamer_id);
        let exists = self.pool_by_id.get(&pool_id).is_some();
        assert!(!exists, "Pool already exists");
        let id = pool_id.clone();
        let key_prefix = &(pool_id).as_bytes();
        assert_eq!(env::attached_deposit(), 25_000_000_000_000_000_000_000_000);
        Pool {
            id,
            streamer_id,
            deposit: env::attached_deposit(),
            maximum_quests: 5,
            expired_at: env::epoch_height() + 2,
            quest_by_challenger: UnorderedMap::new(*key_prefix),
        }
    }

    pub fn delete_pool(&mut self, pool_id: PoolId) -> bool {
        let predecessor = env::predecessor_account_id();
        let pool = self.pool_by_id.get(&pool_id).expect("Pool doesn't exist");

        let is_challenger = pool
            .quest_by_challenger
            .values()
            .find(|challenger| challenger == &predecessor)
            .is_some();

        if predecessor == pool.streamer_id {
            Promise::new(pool.streamer_id.clone()).transfer(pool.deposit);
            for (quest_id, account_id) in pool.quest_by_challenger.iter() {
                let quest = self
                    .quest_by_id
                    .get(&quest_id)
                    .expect("Quest doesn't exist");
                Promise::new(account_id).transfer(quest.amount);
                self.quest_by_id.remove(&quest_id);
            }
            self.pool_by_id.remove(&pool.id);
            self.pool_by_streamer.remove(&pool.streamer_id);
            return true;
        }
        if is_challenger {
            let num_of_quest = pool.quest_by_challenger.len();
            let fee_per_quest = pool.deposit * 20 / 100 / num_of_quest as u128;
            Promise::new(pool.streamer_id.clone()).transfer(pool.deposit * 80 / 100);
            for (quest_id, account_id) in pool.quest_by_challenger.iter() {
                let quest = self
                    .quest_by_id
                    .get(&quest_id)
                    .expect("Quest doesn't exist");
                Promise::new(account_id).transfer(quest.amount + fee_per_quest);
                self.quest_by_id.remove(&quest_id);
            }
            self.pool_by_id.remove(&pool.id);
            self.pool_by_streamer.remove(&pool.streamer_id);
            return true;
        }
        false
    }
}
