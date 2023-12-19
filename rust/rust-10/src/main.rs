// options

use std::time::{SystemTime, UNIX_EPOCH};

fn create_option() -> Option<u64> {
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let is_even = current_time % 2 == 0;
    if is_even {
        Some(current_time)
    } else {
        None
    }
}

fn main() {
    let current_time = create_option();

    if let Some(secs) = current_time {
        println!("current time: {secs}")
    } else {
        println!("current time is not even to be logged")
    }
}
