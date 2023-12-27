// self

mod awesome_file_module;

use awesome_file_module::nested::call_others;

pub fn baz() {
    println!("bar")
}

fn main() {
    call_others();
}
