pub mod handlers;
pub mod models;
pub mod storage;
pub mod utils;

use crate::models::event_model::{Event, EventPayload};
use crate::models::bet_model::BetPayload;
use crate::utils::errors::Error;
use candid::Principal;
use ic_cdk::caller;

#[ic_cdk::query]
async fn whoami () -> Principal {
    caller()
}

//Generate the .did file content
ic_cdk::export_candid!();
