// static lifetime

fn hello_world() -> &'static str {
    "hello world"
}



fn main() {
    let hello_world_str = hello_world();
    println!("{hello_world_str}")
}
