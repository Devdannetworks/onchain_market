pub mod handlers;
pub mod models;
pub mod storage;
pub mod utils;

use crate::models::event_model::{Event, EventPayload};
use crate::models::bet_model::{BetPayload, BetType};
use crate::utils::errors::Error;
use candid::Principal;
use ic_cdk;

//Generate the .did file content
ic_cdk::export_candid!();
