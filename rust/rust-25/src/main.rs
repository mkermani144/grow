// explicit lifetime basics

fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() {
        a
    } else {
        b
    }
}

fn main() {
    let x = String::from("Hello world!");
    {
        let y = String::from("Hello universe!");
        println!("{}", longest(&x, &y));
    }
}
