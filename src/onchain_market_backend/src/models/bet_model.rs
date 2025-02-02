use serde::{Serialize, Deserialize};
use candid::{CandidType, Principal};

#[derive(Eq, Ord, PartialEq, PartialOrd, CandidType, Clone, Deserialize, Serialize)]
pub struct BetPayload {
    pub user_id: Principal,
    pub event_id: u64,
    pub outcome_id: u64,
    pub amount: u64,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, CandidType, Clone, Deserialize, Serialize)]
pub enum BetType {
     Binary,
     Multichoice,
}


