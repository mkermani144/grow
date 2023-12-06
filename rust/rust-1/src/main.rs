// Control flow

fn main() {
    if 1 < 2 {
        println!("inside if")
    }
    if 1 > 2 {
    } else {
        println!("inside else")
    }
    let mut counter = 0;
    while counter < 3 {
        counter += 1;
        println!("counter: {}", counter)
    }
    for i in [1, 2, 3] {
        println!("loop: {}", i)
    }
    match counter {
        1 => println!("1"),
        2 => println!("2"),
        x => println!("{}", x),
    }
}
