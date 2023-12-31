// channels

use std::{
    sync::mpsc::channel,
    thread::{self},
};

fn main() {
    let (tx, rx) = channel::<String>();

    let t_handle = thread::spawn(move || {
        tx.send(String::from("hello world!")).unwrap();
    });

    let r_handle = thread::spawn(move || rx.recv().unwrap());

    t_handle.join().unwrap();
    let message = r_handle.join().unwrap();

    println!("{message}")
}
