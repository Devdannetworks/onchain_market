use crate::models::events::Event;
use ic_stable_structures::StableBTreeMap;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::DefaultMemoryImpl;
use std::cell::RefCell;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static EVENT_ID_COUNTER: RefCell<IdCell> = RefCell::new(IdCell::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0
    ).expect("Failed to initialize EVENT_ID_COUNTER"));
    static EVENT_STORAGE: RefCell<StableBTreeMap<u64, Event, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
}

pub fn get_event_storage() -> &'static RefCell<StableBTreeMap<u64, Event, VirtualMemory<DefaultMemoryImpl>>> {
    &EVENT_STORAGE
}

pub fn increment_event_id_counter () -> Result<u64, String> {
    let id = EVENT_ID_COUNTER.with(|counter| {
        let mut counter = counter.borrow_mut();
        let current_value = *counter.get();
        match counter.set(current_value + 1) {
            Ok(_) => Ok(current_value),
            Err(_) => Err("Failed to increment EVENT_ID_COUNTER".to_string()),
        }
    }).map_err(|e| e)?;
    Ok(id)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::events::{Event, EventStatus};

    #[test]
    fn test_storage_insert_and_retrieve() {
        let storage = get_event_storage();
        let event = Event {
            event_id: 1,
            title: "Test Event".to_string(),
            description: "This is a test event.".to_string(),
            created_at: 0,
            updated_at: None,
            amount_staked: Some(5000),
            category: "Sports".to_string(),
            sub_category: "Basketball".to_string(),
            event_status: EventStatus::Open,
            outcome: vec![],
            close_time: "2024-12-31T23:59:59Z".to_string(),
            bets: None,
            bet_type: crate::models::events::BetType::Binary,
        };
        storage.with(|s| s.borrow_mut().insert(event.event_id, event.clone()));
        let retrieved = storage.with(|s| s.borrow().get(&1).cloned());
        assert!(retrieved.is_some());
        assert_eq!(retrieved.unwrap().title, "Test Event");
    }
}
