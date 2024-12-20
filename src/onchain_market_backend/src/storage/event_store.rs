use crate::models::event_model::Event;
use candid::{Decode, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::borrow::Cow;
use std::cell::RefCell;

//My alias types
type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

//Implement STorable and BoundedStorable for Event
impl Storable for Event {
    fn to_bytes(&self) -> Cow<[u8]> {
        Encode!(self)
            .map(Cow::Owned)
            .expect("Failed to encode Event")
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).expect("Failed to decode Event")
    }
}

impl BoundedStorable for Event {
    const IS_FIXED_SIZE: bool = false;
    const MAX_SIZE: u32 = 1024;
}

//Define my global variables
thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static EVENT_ID_COUNTER: RefCell<IdCell> = RefCell::new(IdCell::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0
    ).expect("Failed to initialize EVENT_ID_COUNTER"));
    static EVENT_STORAGE: RefCell<StableBTreeMap<u64, Event, VirtualMemory<DefaultMemoryImpl>>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
}

pub fn get_event_storage() -> &'static std::thread::LocalKey<
    RefCell<StableBTreeMap<u64, Event, VirtualMemory<DefaultMemoryImpl>>>,
> {
    &EVENT_STORAGE
}

pub fn increment_event_id_counter() -> Result<u64, String> {
    EVENT_ID_COUNTER.with(|counter| {
        let mut counter = counter.borrow_mut();
        let current_value = *counter.get();
        counter
            .set(current_value + 1)
            .map_err(|_| "Failed to increment EVENT_ID_COUNTER".to_string())?;
        Ok(current_value + 1)
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::bet_model::BetType;
    use crate::models::event_model::{Event, EventStatus};

    #[test]
    fn test_storage_insert_and_retrieve() {
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
            bet_type: BetType::Binary,
        };

        EVENT_STORAGE.with(|storage| {
            storage.borrow_mut().insert(event.event_id, event.clone());
        });

        let retrieved = EVENT_STORAGE.with(|storage| {
            storage
                .borrow()
                .get(&1)
                .as_ref()
                .into_iter()
                .cloned()
                .next()
        });
        assert!(retrieved.is_some());
        assert_eq!(retrieved.unwrap().title, "Test Event");
    }

    #[test]
    fn test_increment_event_id_counter() {
        let id1 = increment_event_id_counter().expect("Failed to increment counter");
        let id2 = increment_event_id_counter().expect("Failed to increment counter");
        assert_eq!(id1 + 1, id2);
    }
}
