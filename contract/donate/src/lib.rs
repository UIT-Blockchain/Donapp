use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, AccountId, near_bindgen, PanicOnDefault, BorshStorageKey,
               Promise, PromiseOrValue, PromiseResult, Gas, ext_contract};
use near_sdk::collections::{LookupMap};

pub const TRANSFER_GAS: Gas = Gas(10_000_000_000_000); //

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
#[near_bindgen]
struct ABC {
    // exmaple struct
}




#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::{VMContextBuilder, accounts};
    use near_sdk::{testing_env, MockedBlockchain};

    // test here
}