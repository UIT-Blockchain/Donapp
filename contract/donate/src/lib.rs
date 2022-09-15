use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedSet, Vector};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, BorshStorageKey, PanicOnDefault};

mod internal;
mod pool;
mod quest;

use crate::internal::*;
pub use crate::pool::*;
pub use crate::quest::*;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Donap {
    pub owner_id: AccountId,

    pub pool_by_streamer: LookupMap<AccountId, PoolId>,

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
            pool_by_streamer: LookupMap::new(StorageKey::PoolByStreamer),
            pool_by_id: LookupMap::new(StorageKey::PoolById),
            quest_by_id: LookupMap::new(StorageKey::QuestById),
        }
    }
}

// #[cfg(all(test, not(target_arch = "wasm32")))]
// mod tests {
//     use super::*;
//     use near_sdk::test_utils::{accounts, VMContextBuilder};
//     use near_sdk::{testing_env, MockedBlockchain};

//     // test here
// }
