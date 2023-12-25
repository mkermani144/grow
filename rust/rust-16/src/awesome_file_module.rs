pub mod nested {
    pub fn call_others() {
        super::foo();
        crate::baz()
    }
}

fn foo() {
    println!("gg")
}
