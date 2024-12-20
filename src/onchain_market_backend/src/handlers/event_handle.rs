use crate::models::event_model::{Event, EventPayload, EventStatus};
use crate::storage::event_store::{get_event_storage, increment_event_id_counter};
use crate::utils::errors::Error;
use ic_cdk::api::{time};
use ic_cdk::api::Principal;

#[ic_cdk::update]
pub fn create_event(payload: EventPayload) -> Result<Event, String> {
    let storage = get_event_storage();
    let id = increment_event_id_counter().unwrap();
    let new_event = Event {
        event_id: id, 
        title: payload.title,
        description: payload.description,
        created_at: time(),
        updated_at: None,
        amount_staked: None,
        category: payload.category,
        sub_category: payload.sub_category,
        event_status: EventStatus::Open,
        outcome: payload.outcome,
        close_time: payload.close_time,
        bets: None,
        bet_type: payload.bet_type,
    };
    storage.with(|s| s.borrow_mut().insert(new_event.event_id, new_event.clone()));
    Ok(new_event)
}

#[ic_cdk::query]
pub fn list_events_by_category(category: String) -> Vec<Event> {
    let storage = get_event_storage();
    storage.with(|s| {
        s.borrow()
            .iter()
            .filter_map(|(_, event)| {
                if event.category == category {
                    Some(event.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

#[ic_cdk::query]
pub fn list_all_events() -> Vec<Event> {
    let storage = get_event_storage();
    storage.with(|s| s.borrow().iter().map(|(_, event)| event.clone()).collect())
}

#[ic_cdk::query]
pub fn get_an_event(id: u64) -> Result<Event, Error> {
    let storage = get_event_storage();
    storage.with(|s| {
        if let Some(event) = s.borrow().get(&id) {
            Ok(event.clone())
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id={} could not be found!", id),
            })
        }
    })
}

#[ic_cdk::update]
pub fn update_event(id: u64, update_payload: EventPayload) -> Result<Event, Error> {
    let storage = get_event_storage();
    storage.with(|storage| {
        let mut storage = storage.borrow_mut();
        if let Some(event) = storage.get_mut(&id) {
            if event.event_status == EventStatus::Settled {
                return Err(Error::Authorization {
                    msg: format!("Cannot update event with id {} as it is already settled", id),
                });
            }

            event.title = update_payload.title;
            event.description = update_payload.description;
            event.category = update_payload.category;
            event.sub_category = update_payload.sub_category;
            event.close_time = update_payload.close_time;
            event.updated_at = Some(time());

            Ok(event.clone())
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id {} not found", id),
            })
        }
    })
}

#[ic_cdk::update]
pub fn delete_event(id: u64, user_id: Principal) -> Result<Event, Error> {
    let storage = get_event_storage();
    storage.with(|s| {
        let mut storage = s.borrow_mut();
        if let Some(event) = storage.get(&id) {
            if event.event_status != EventStatus::Settled {
                return Err(Error::Authorization {
                    msg: format!(
                        "Cannot delete event with id {} as it is not settled yet",
                        id
                    ),
                });
            }
            if let Some(bets) = &event.bets {
                if bets.iter().any(|bet| bet.user_id == user_id) {
                    return Ok(storage.remove(&id).unwrap());
                }
            }
            Err(Error::Authorization {
                msg: format!("You are not authorized to delete event with id {}", id),
            })
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id {} not found", id),
            })
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::event_model::{BetType, Outcome};

    #[test]
    fn test_create_event() {
        let payload = EventPayload {
            title: "Test Event".to_string(),
            description: "This is a test event.".to_string(),
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            amount_staked: 1000,
            outcome: vec![
                Outcome {
                    id: 1,
                    description: "Team A Wins".to_string(),
                    odds: 150,
                    total_bets: 0,
                },
                Outcome {
                    id: 2,
                    description: "Team B Wins".to_string(),
                    odds: 200,
                    total_bets: 0,
                },
            ],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bet_type: BetType::Binary,
        };
        let result = create_event(payload).unwrap();
        assert_eq!(result.title, "Test Event");
        assert_eq!(result.category, "Sports");
    }

    #[test]
    fn test_list_events_by_category() {
        let storage = get_event_storage();
        storage.with(|s| s.borrow_mut().clear());

        let event1 = Event {
            event_id: 1,
            title: "Event 1".to_string(),
            description: "Description 1".to_string(),
            created_at: 0,
            updated_at: None,
            amount_staked: None,
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            event_status: EventStatus::Open,
            outcome: vec![],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: None,
            bet_type: BetType::Binary,
        };

        let event2 = Event {
            event_id: 2,
            title: "Event 2".to_string(),
            category: "Politics".to_string(),
            ..event1.clone()
        };

        storage.with(|s| {
            s.borrow_mut().insert(event1.event_id, event1.clone());
            s.borrow_mut().insert(event2.event_id, event2.clone());
        });

        let sports_events = list_events_by_category("Sports".to_string());
        assert_eq!(sports_events.len(), 1);
        assert_eq!(sports_events[0].category, "Sports");
    }

    #[test]
    fn test_list_all_events() {
        let storage = get_event_storage();
        storage.borrow_mut().clear();

        let event1 = Event {
            event_id: 1,
            title: "Event 1".to_string(),
            description: "Description 1".to_string(),
            created_at: 0,
            updated_at: None,
            amount_staked: None,
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            event_status: EventStatus::Open,
            outcome: vec![],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: None,
            bet_type: BetType::Binary,
        };

        let event2 = Event {
            event_id: 2,
            title: "Event 2".to_string(),
            ..event1.clone()
        };

        
        storage.borrow_mut().insert(event1.event_id, event1.clone());
        storage.borrow_mut().insert(event2.event_id, event2.clone());
        

        let all_events = list_all_events();
        assert_eq!(all_events.len(), 2);
    }
}
