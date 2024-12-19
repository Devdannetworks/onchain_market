#[derive(candid::CandidType, Clone, Deserialize, Serialize)]
pub enum Error {
    pub NotFound { msg: String },
    pub Authorization { msg: String },
}

