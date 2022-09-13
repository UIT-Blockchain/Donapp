use crate::*;

pub type PoolId = String;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Pool {
    pub id: PoolId,
    pub deposit: Balance,
    pub maximum_quests: u64,
    pub expired_at: u64,
    pub quest_ids: UnorderedSet<QuestId>,
}

#[near_bindgen]
impl Donap {
    pub fn create_pool(&mut self) {}

    pub fn delete_pool(&mut self) {}
}
