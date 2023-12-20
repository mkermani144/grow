// results

use std::{
    error::Error,
    fmt::Display,
    time::{SystemTime, UNIX_EPOCH},
};

#[derive(Debug)]
struct DumbError;

impl Error for DumbError {}
impl Display for DumbError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "DumbError")
    }
}

fn create_option() -> Result<u64, DumbError> {
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let is_even = current_time % 2 == 0;
    if is_even {
        Ok(current_time)
    } else {
        Err(DumbError)
    }
}

fn main() {
    let current_time = create_option();

    match current_time {
        Ok(secs) => println!("current time: {secs}"),
        Err(error) => println!("{error}"),
    }
}
