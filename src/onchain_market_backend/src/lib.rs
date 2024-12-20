pub mod handlers;
pub mod storage;
pub mod utils;
pub mod models;


use ic_cdk;

//Generate the .did file content
ic_cdk::export_candid!();
