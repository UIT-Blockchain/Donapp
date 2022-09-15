use crate::*;

pub type QuestId = String;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Quest {
    pub id: QuestId,
    pub pool_id: PoolId,
    pub name: String,
    pub description: String,
    pub money: Balance,
    pub vote_threshold: u64,
    pub voter_ids: Vector<AccountId>,
}

#[near_bindgen]
impl Donap {
    pub fn create_quest(&mut self) {}

    pub fn reject_quest(&mut self) {}

    pub fn vote_quest(&mut self) {}
}
