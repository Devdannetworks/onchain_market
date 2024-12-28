use crate::models::event_model::Event;
use candid::{Decode, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::borrow::Cow;
use std::cell::RefCell;

// My alias types
type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

// Implement Storable and BoundedStorable for Event
impl Storable for Event {
    fn to_bytes(&self) -> Cow<[u8]> {
        Encode!(self).map(Cow::Owned).expect("Failed to encode Event")
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).expect("Failed to decode Event")
    }
}

impl BoundedStorable for Event {
    const IS_FIXED_SIZE: bool = false;
    const MAX_SIZE: u32 = 1024;
}

// Define my global variables
thread_local! {
    static EVENT_MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static EVENT_ID_COUNTER: RefCell<IdCell> = RefCell::new(IdCell::init(
        EVENT_MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0
    ).expect("Failed to initialize EVENT_ID_COUNTER"));
    static BET_ID_COUNTER: RefCell<IdCell> = RefCell::new(IdCell::init(
        EVENT_MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))), 0
    ).expect("Failed to initialize BET_ID_COUNTER"));
    static EVENT_STORAGE: RefCell<StableBTreeMap<u64, Event, VirtualMemory<DefaultMemoryImpl>>> = RefCell::new(StableBTreeMap::init(
        EVENT_MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
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

pub fn increment_bet_id_counter() -> Result<u64, String> {
    BET_ID_COUNTER.with(|counter| {
        let mut counter = counter.borrow_mut();
        let current_value = *counter.get();
        counter
            .set(current_value + 1)
            .map_err(|_| "Failed to increment BET_ID_COUNTER".to_string())?;
        Ok(current_value + 1)
    })
}
