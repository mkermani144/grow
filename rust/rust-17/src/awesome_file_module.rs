pub mod nested {
    pub fn call_others() {
        self::foo();
        foo();
        crate::baz()
    }

    fn foo() {
        println!("gg")
    }
}
