#[macro_use] extern crate serde;
use ic_stable_structures::memory_manager::{MemoryId, VirtualMemory, MemoryManager};
use ic_stable_structures::{Cell, Storable, BoundedStorable, DefaultMemoryImpl, StableBTreeMap};
use ic_cdk::api::time;
use std::{borrow::Cow, cell::RefCell};
use candid::{Decode, Encode};
use candid::Principal;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Serialize, Deserialize)]
struct Event {
    event_id: u64,
    title: String,
    description: String,
    created_at: u64,
    updated_at: Option<u64>,
    amount_staked: Option<u64>,
    category: String,
    sub_category: String,
    event_status: EventStatus,
    outcome: Vec<Outcome>,
    close_time: String,
    bets: Option<Vec<BetPayload>>,
    bet_type: BetType,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
enum BetType {
    Binary,
    Multichoice,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
struct EventPayload {
    title: String,
    description: String,
    category: String,
    sub_category: String,
    amount_staked: u64,
    outcome: Vec<Outcome>,
    close_time: String,
    bet_type: BetType,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
struct BetPayload {
    user_id: Principal,
    event_id: u64,
    bet_id: u64,
    outcome_id: u64,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize)]
struct Outcome {
    id: u64,
    description: String,
    odds: u64,
    total_bets: u64,
}

#[derive(Eq, Ord, PartialEq, PartialOrd, candid::CandidType, Clone, Deserialize, Serialize )]
enum EventStatus {
    Open,
    Close,
    Settled,
}

#[derive(candid::CandidType, Clone, Deserialize, Serialize)]
enum Error {
    NotFound { msg: String },
    Authorization { msg: String },
}

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

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static EVENT_ID_COUNTER: RefCell<IdCell> = RefCell::new(IdCell::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0
    ).expect("Failed to increment EVENT_ID_COUNTER"));
    static STORAGE: RefCell<StableBTreeMap<u64, Event, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
}

#[ic_cdk::update]
fn create_event(event: EventPayload) -> Result<Option<Event>, String> {
    let id = EVENT_ID_COUNTER.with(|counter| {
        let mut counter = counter.borrow_mut();
        let current_value = *counter.get();
        match counter.set(current_value + 1) {
            Ok(_) => Ok(current_value),
            Err(_) => Err("Failed to increment EVENT_ID_COUNTER".to_string()),
        }
    }).map_err(|e| e)?;

    let new_event = Event {
        event_id: id,
        title: event.title,
        description: event.description,
        category: event.category,
        sub_category: event.sub_category,
        created_at: time(),
        outcome: event.outcome,
        event_status: EventStatus::Open,
        close_time: event.close_time,
        bet_type: event.bet_type,
        updated_at: None,
        amount_staked: None,
        bets: None,
    };

    STORAGE.with(|storage| {
        storage.borrow_mut().insert(id, new_event.clone());
    });

    Ok(Some(new_event))
}

#[ic_cdk::update]
fn update_event(id: u64, update_payload: EventPayload) -> Result<Event, Error> {
    STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        match storage.get(&id) {
            Some(mut event) => {
                if event.event_status == EventStatus::Settled {
                    return Err(Error::Authorization {
                        msg: format!("Cannot update event {} as it is already settled", id),
                    });
                }

                event.title = update_payload.title;
                event.description = update_payload.description;
                event.close_time = update_payload.close_time;
                event.updated_at = Some(time());

                storage.insert(id, event.clone());
                Ok(event)
            }
            None => Err(Error::NotFound {
                msg: format!("Event with id {} not found", id),
            }),
        }
    })
}

#[ic_cdk::query]
fn _get_an_event(id: u64) -> Result<Event, Error> {
    match _get_event(id) {
        Some(event) => Ok(event),
        None => Err(Error::NotFound {
            msg: format!("Event with id={} could not be found!", id),
        }),
    }
}

fn _get_event(id: u64) -> Option<Event> {
    STORAGE.with(|s| s.borrow().get(&id))
}

#[ic_cdk::query]
fn list_all_events() -> Vec<Event> {
    STORAGE.with(|s| s.borrow().iter().map(|(_, event)| event.clone()).collect())
}

#[ic_cdk::query]
fn list_popular_events() -> Vec<Event> {
    STORAGE.with(|storage| {
        let mut events: Vec<Event> = storage
            .borrow()
            .iter()
            .filter_map(|(_, event)| {
                if let Some(amount) = event.amount_staked {
                    if amount > 10_000 {
                        return Some(event.clone());
                    }
                }
                None
            })
            .collect();

        events.sort_by(|a, b| b.amount_staked.unwrap_or(0).cmp(&a.amount_staked.unwrap_or(0)));
        events
    })
}

#[ic_cdk::query]
fn list_events_by_category(category: String) -> Vec<Event> {
    STORAGE.with(|s| {
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
fn delete(id: u64, user_id: Principal) -> Result<Event, Error> {
    STORAGE.with(|s| {
        let mut storage = s.borrow_mut();
        match storage.get(&id) {
            Some(event) => {
                if event.event_status != EventStatus::Settled {
                    return Err(Error::Authorization {
                        msg: format!("You are not authorized to delete event with id: {} as it is not settled yet", id),
                    });
                }
                if event.bets.as_ref().map_or(false, |bets| bets.iter().any(|bet| bet.user_id == user_id)) {
                    let removed_event = storage.remove(&id).unwrap();
                    Ok(removed_event)
                } else {
                    Err(Error::Authorization {
                        msg: format!("You are not authorized to delete event with id: {}", id),
                    })
                }
            }
            None => Err(Error::NotFound {
                msg: format!("Event with id: {} was not found", id),
            }),
        }
    })
}

ic_cdk::export_candid!();
