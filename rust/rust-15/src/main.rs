// use keyword

mod awesome_file_module;

use awesome_file_module::nested::{bar, to_be_renamed as foo};

fn main() {
    foo();
    bar()
}
