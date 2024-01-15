// simple macro rules

macro_rules! printer_main {
    ($str_to_print: expr) => {
        fn main() {
            println!($str_to_print)
        }
    };
}

printer_main!("Hello world!");
