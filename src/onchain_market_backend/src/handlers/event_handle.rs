use crate::models::event_model::{Event, EventPayload, EventStatus};
use crate::storage::event_store::{get_event_storage, increment_event_id_counter};
use crate::utils::errors::Error;
use candid::Principal;
use ic_cdk::api::time;

#[cfg(not(test))]
pub fn get_current_time() -> u64 {
    time() // Retrieve current timestamp
}

#[cfg(test)]
pub fn get_current_time() -> u64 {
    1638316800 // Mock timestamp for testing
}

/// Create a new event with validation and error handling
#[ic_cdk::update]
pub fn create_event(payload: EventPayload) -> Result<Event, String> {
    // Validate payload data
    if payload.title.is_empty() || payload.description.is_empty() || payload.category.is_empty() {
        return Err("Invalid input: Title, description, and category cannot be empty.".to_string());
    }
    
    // Increment event ID counter
    let id = increment_event_id_counter().unwrap();
    
    // Create the event object
    let new_event = Event {
        event_id: id,
        title: payload.title,
        description: payload.description,
        created_at: get_current_time(),
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

    // Store the event in the storage
    get_event_storage().with(|storage| {
        storage.borrow_mut().insert(new_event.event_id, new_event.clone());
    });

    Ok(new_event)
}

/// List all events by a specific category
#[ic_cdk::query]
pub fn list_events_by_category(category: String) -> Vec<Event> {
    // Validate category input
    if category.is_empty() {
        return vec![]; // Return empty list for invalid category
    }

    // Filter events based on the category
    get_event_storage().with(|storage| {
        storage
            .borrow()
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

/// List all stored events
#[ic_cdk::query]
pub fn list_all_events() -> Vec<Event> {
    // Retrieve all events from the storage
    get_event_storage().with(|storage| {
        storage.borrow().iter().map(|(_, event)| event.clone()).collect()
    })
}

/// Retrieve a single event by its ID
#[ic_cdk::query]
pub fn get_an_event(id: u64) -> Result<Event, Error> {
    // Retrieve event from storage by ID
    get_event_storage().with(|storage| storage.borrow().get(&id).map(|event| event.clone()))
        .ok_or(Error::NotFound {
            msg: format!("Event with id={} could not be found!", id),
        })
}


/// Update the details of an existing event
#[ic_cdk::update]
pub fn update_event(id: u64, update_payload: EventPayload) -> Result<Event, Error> {
    // Validate payload data
    if update_payload.title.is_empty() {
        return Err(Error::InvalidInput {
            msg: "Event title cannot be empty.".to_string(),
        });
    }
    if update_payload.category.is_empty() {
        return Err(Error::InvalidInput {
            msg: "Event category cannot be empty.".to_string(),
        });
    }
    if update_payload.close_time.is_empty() {
        return Err(Error::InvalidInput {
            msg: "Close time cannot be empty.".to_string(),
        });
    }

    get_event_storage().with(|storage| {
        let mut storage_ref = storage.borrow_mut();

        // Retrieve the event to update
        if let Some(event) = storage_ref.get(&id) {
            // Ensure the event is not settled
            if event.event_status == EventStatus::Settled {
                return Err(Error::Authorization {
                    msg: "Cannot update a settled event.".to_string(),
                });
            }

            // Update the event details
            let mut updated_event = event.clone();
            updated_event.title = update_payload.title;
            updated_event.description = update_payload.description;
            updated_event.category = update_payload.category;
            updated_event.sub_category = update_payload.sub_category;
            updated_event.close_time = update_payload.close_time;
            updated_event.updated_at = Some(get_current_time());

            // Save the updated event back into the storage
            storage_ref.insert(id, updated_event.clone());
            Ok(updated_event)
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id={} not found.", id),
            })
        }
    })
}

/// Delete an event by its ID with validation
#[ic_cdk::update]
pub fn delete_event(id: u64, user_id: Principal) -> Result<Event, Error> {
    get_event_storage().with(|storage| {
        let mut storage_ref = storage.borrow_mut();

        if let Some(event) = storage_ref.get(&id) {
            if event.event_status != EventStatus::Settled {
                return Err(Error::Authorization {
                    msg: "Cannot delete an event that is not settled.".to_string(),
                });
            }

            // Check if user has associated bets
            if let Some(bets) = &event.bets {
                if bets.iter().any(|bet| bet.user_id == user_id) {
                    return Ok(storage_ref.remove(&id).unwrap());
                }
            }

            Err(Error::Authorization {
                msg: "You are not authorized to delete this event.".to_string(),
            })
        } else {
            Err(Error::NotFound {
                msg: format!("Event with id={} not found.", id),
            })
        }
    })
}
