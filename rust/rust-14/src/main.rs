// basic modules

mod awesome_inline_module {
    pub fn foo() {
        println!("foo")
    }
}
mod awesome_file_module;

fn main() {
    awesome_inline_module::foo();
    awesome_file_module::bar()
}
