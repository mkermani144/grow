// propagating errors

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

fn create_result() -> Result<u64, DumbError> {
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

fn main() -> Result<(), DumbError> {
    let current_time = create_result()?;

    println!("current time: {current_time}");

    Ok(())
}
