// enums

#[derive(Debug)]
struct SomeStruct {
    x: u8,
    y: u8,
}

#[derive(Debug)]
enum X {
    Unit,
    Tuple(u8, u8),
    StructTuple(SomeStruct),
    Struct { a: u8, b: u8 },
}

fn main() {
    let unit = X::Unit;
    let tuple = X::Tuple(1, 2);
    let struct_tuple = X::StructTuple(SomeStruct { x: 2, y: 3 });
    let struct_ = X::Struct { a: 5, b: 6 };

    println!("{:?}, {:?}, {:?}, {:?}", unit, tuple, struct_tuple, struct_)
}
