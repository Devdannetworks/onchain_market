use crate::models::bet_model::{BetPayload, BetType};
use serde::{Deserialize, Serialize};

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Serialize, Deserialize)]
pub struct Event {
    pub event_id: u64,
    pub title: String,
    pub description: String,
    pub created_at: u64,
    pub updated_at: Option<u64>,
    pub amount_staked: Option<u64>,
    pub category: String,
    pub sub_category: String,
    pub event_status: EventStatus,
    pub outcome: Vec<Outcome>,
    pub close_time: String,
    pub bets: Option<Vec<BetPayload>>,
    pub bet_type: BetType,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
pub struct EventPayload {
    pub title: String,
    pub description: String,
    pub category: String,
    pub sub_category: String,
    pub outcome: Vec<Outcome>,
    pub close_time: String,
    pub bet_type: BetType,
    pub created_at: u64,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Serialize, Deserialize)]
pub enum EventStatus {
    Open,
    Close,
    Settled,
}
#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
pub struct Outcome {
    pub id: u64,
    pub description: String,
    pub odds: u64,
    pub total_bets: u64,
    pub total_amount: u64,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_event_creation() {
        let event = Event {
            event_id: 1,
            title: "Sample Event".to_string(),
            description: "An event for testing.".to_string(),
            created_at: 0,
            updated_at: None,
            amount_staked: Some(1000),
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            event_status: EventStatus::Open,
            outcome: vec![],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: None,
            bet_type: BetType::Binary,
        };
        assert_eq!(event.title, "Sample Event");
    }
}
