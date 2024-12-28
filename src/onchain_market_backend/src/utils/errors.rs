use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Clone, Deserialize, Serialize)]
pub enum Error {
    NotFound { msg: String },
    Authorization { msg: String },
    InvalidState {msg: String},
    InvalidInput {msg: String},
}
