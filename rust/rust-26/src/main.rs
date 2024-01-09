// more on explicit lifetimes

fn skip_first<'b>(a: &str, b: &'b str) -> &'b str {
    b
}

fn main() {
    let x = String::from("Second!");
    let y;
    {
        let z = String::from("First!");
        y = skip_first(&z, &x)
    }
    println!("{y}")
}
