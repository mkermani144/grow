// structs

#[derive(Debug)]
struct CType {
    field_a: u8,
    field_b: u8,
}

#[derive(Debug)]
struct Tuple(u8, u8);

#[derive(Debug)]
struct Unit;

fn main() {
    let a = CType {
        field_a: 2,
        field_b: 3,
    };
    let b = Tuple(4, 5);
    let c = Unit;

    println!("{:?}, {:?}, {:?}", a, b, c)
}
