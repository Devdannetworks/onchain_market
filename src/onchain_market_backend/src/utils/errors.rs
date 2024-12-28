use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Clone, Deserialize, Serialize, Debug)]
pub enum Error {
    NotFound { msg: String },
    Authorization { msg: String },
    InvalidInput { msg: String },
    StorageError { msg: String }, // General storage error
}
