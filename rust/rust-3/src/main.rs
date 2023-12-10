// if let

use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    if let 0 = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs()
        % 2
    {
        println!("an even time")
    } else {
        println!("an odd time")
    }
}
