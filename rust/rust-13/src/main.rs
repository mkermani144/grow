// thiserror

use std::{
    error::Error,
    fmt::Display,
    time::{SystemTime, UNIX_EPOCH},
};

use thiserror::Error;

#[derive(Error, Debug)]
enum DumbErrors {
    #[error("this error is dumb: {0}")]
    DumbError(String),
}

fn create_result() -> Result<u64, DumbErrors> {
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let is_even = current_time % 2 == 0;
    if is_even {
        Ok(current_time)
    } else {
        Err(DumbErrors::DumbError(String::from("Very dumb")))
    }
}

fn main() {
    let current_time = create_result();

    match current_time {
        Ok(secs) => println!("current time: {secs}"),
        Err(error) => println!("{error}"),
    }
}
