// trait bounds with where

trait Printer {
    fn printer(&self);
}

fn custom_print<T>(arg: T)
where
    T: Printer,
{
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
