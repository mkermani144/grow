// traits

trait AddOneAble {
    fn add_one(&self) -> Self;
}

struct Wrapped<T> {
    data: T,
    meta: String,
}
trait Wrap {
    fn wrap(&self) -> Wrapped<Self>
    where
        Self: std::marker::Sized;
}

impl AddOneAble for u8 {
    fn add_one(&self) -> Self {
        self + 1
    }
}

impl Wrap for u8 {
    fn wrap(&self) -> Wrapped<Self>
    where
        Self: std::marker::Sized,
    {
        Wrapped {
            data: *self,
            meta: String::from("hello world"),
        }
    }
}

fn main() {
    let a: u8 = 3;

    println!("{}, {}, {}", a.add_one(), a.wrap().data, a.wrap().meta)
}
