use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, Vector};
use near_sdk::json_types::U64;
use near_sdk::{env, near_bindgen, AccountId, Balance, BorshStorageKey, PanicOnDefault, Promise};
use serde::{Deserialize, Serialize};

mod internal;
mod pool;
mod quest;
mod view;

use crate::internal::*;
pub use crate::pool::*;
pub use crate::quest::*;
pub use crate::view::*;

pub const MAXIMUM_QUESTS: u64 = 5;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Donap {
    pub owner_id: AccountId,

    pub pool_by_id: LookupMap<PoolId, Pool>,

    pub quest_by_id: LookupMap<QuestId, Quest>,
}

#[derive(BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    PoolByStreamer,
    PoolById,
    QuestById,
}

#[near_bindgen]
impl Donap {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            pool_by_id: LookupMap::new(StorageKey::PoolById),
            quest_by_id: LookupMap::new(StorageKey::QuestById),
        }
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::test_env::{alice, bob};
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::testing_env;

    fn get_context_builder(is_view: bool) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .account_balance(0)
            .current_account_id(bob())
            .signer_account_id(bob())
            .epoch_height(0)
            .is_view(is_view);
        builder
    }

    #[test]
    fn create_pool() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();
        let pool = contract.get_pool(bob()).unwrap();
        assert_eq!(pool.id, format!("{}.pool", bob()));
        assert_eq!(pool.quests.len(), 0);
        assert_eq!(pool.expired_at, 2);
    }

    #[test]
    fn create_quest() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();

        context
            .signer_account_id(alice())
            .predecessor_account_id(alice())
            .attached_deposit(ntoy(1));
        testing_env!(context.build());
        contract.create_quest(bob(), "task 1".to_string(), "Say hi".to_string());
        let quest = contract.get_quest("task 1".to_string()).unwrap();

        assert_eq!(quest.amount, 1);
        assert_eq!(quest.vote_threshold, 10);
        assert_eq!(quest.challenger, alice());
    }

    #[test]
    fn reject_quest() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();
        let pool = contract.get_pool(bob()).unwrap();

        context
            .signer_account_id(alice())
            .predecessor_account_id(alice())
            .attached_deposit(ntoy(1));
        testing_env!(context.build());

        contract.create_quest(bob(), "task 1".to_string(), "Say hi".to_string());
        assert!(contract.get_quest("task 1".to_string()).is_some());
        // assert!(contract
        //     .get_pool(pool.streamer_id.clone())
        //     .unwrap()
        //     .challenger_of_quest
        //     .get("task 1")
        //     .is_some());

        context
            .signer_account_id(bob())
            .predecessor_account_id(bob());
        testing_env!(context.build());

        contract.reject_quest("task 1".to_string());
        assert!(contract.get_quest("task 1".to_string()).is_none());
        // assert!(contract
        //     .get_pool(pool.streamer_id)
        //     .unwrap()
        //     .challenger_of_quest
        //     .get("task 1")
        //     .is_none())
    }

    #[test]
    fn vote_quest() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();

        context
            .signer_account_id(alice())
            .predecessor_account_id(alice())
            .attached_deposit(ntoy(1));
        testing_env!(context.build());
        contract.create_quest(bob(), "task 1".to_string(), "Say hi".to_string());
        let quest = contract.get_quest("task 1".to_string()).unwrap();
        assert_eq!(quest.amount, 1);
        assert_eq!(quest.vote_threshold, 10);
        assert_eq!(quest.challenger, alice());
    }

    #[test]
    fn streamer_delete_pool() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();
        let pool = contract.get_pool(bob()).unwrap();

        contract.delete_pool(pool.id.clone());
        assert!(contract.pool_by_id.get(&pool.id).is_none());
    }

    #[test]
    fn challenger_delete_pool() {
        let mut context = get_context_builder(false);
        context.attached_deposit(ntoy(25));
        testing_env!(context.build());

        let mut contract = Donap::new(bob());
        contract.create_pool();
        let pool = contract.get_pool(bob()).unwrap();

        context
            .signer_account_id(alice())
            .predecessor_account_id(alice())
            .attached_deposit(ntoy(1));
        testing_env!(context.build());
        contract.create_quest(bob(), "task 1".to_string(), "Say hi".to_string());

        context
            .current_account_id(bob())
            .signer_account_id(alice())
            .predecessor_account_id(alice())
            .account_balance(ntoy(50))
            .epoch_height(2);
        testing_env!(context.build());
        contract.delete_pool(pool.id.clone());
        assert!(contract.pool_by_id.get(&pool.id).is_none());
    }
}
