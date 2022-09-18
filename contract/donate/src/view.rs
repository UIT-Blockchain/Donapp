use crate::*;

#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct PoolDTO {
    pub id: PoolId,
    pub streamer_id: AccountId,
    pub expired_at: u64,
    pub quests: Vec<QuestDTO>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct QuestDTO {
    pub id: QuestId,
    pub challenger: AccountId,
    pub pool_id: PoolId,
    pub description: String,
    pub amount: Balance,
    pub vote_threshold: u64,
    pub voter_ids: Vec<AccountId>,
}

#[near_bindgen]
impl Donap {
    pub fn get_pool(&self, streamer_id: AccountId) -> Option<PoolDTO> {
        let pool_id = format!("{}.pool", streamer_id);
        let pool_option = self.pool_by_id.get(&pool_id);
        match pool_option {
            Some(pool) => {
                let quests: Vec<QuestDTO> = pool
                    .challenger_of_quest
                    .keys()
                    .into_iter()
                    .map(|quest_id| self.get_quest(quest_id).unwrap())
                    .collect();

                Some(PoolDTO {
                    id: pool_id,
                    streamer_id,
                    expired_at: pool.expired_at,
                    quests,
                })
            }
            None => None,
        }
    }

    pub fn get_quest(&self, quest_id: QuestId) -> Option<QuestDTO> {
        let quest_option = self.quest_by_id.get(&quest_id);
        match quest_option {
            Some(quest) => {
                let voter_ids: Vec<AccountId> = quest.voter_ids.iter().collect();
                Some(QuestDTO {
                    id: quest_id,
                    challenger: quest.challenger,
                    pool_id: quest.pool_id,
                    description: quest.description,
                    amount: yton(quest.amount),
                    vote_threshold: quest.vote_threshold,
                    voter_ids,
                })
            }
            None => None,
        }
    }
}
