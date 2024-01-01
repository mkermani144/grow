// trait bounds

trait Printer {
    fn printer(&self);
}

fn custom_print<T: Printer>(arg: T) {
    arg.printer()
}

impl Printer for String {
    fn printer(&self) {
        println!("{}", &self)
    }
}

fn main() {
    custom_print(String::from("hello world!"));
    // custom_print(2) <-- raises error
}
