// ownership basics

fn main() {
    let mut s = String::from("hello world");
    let mut s2 = s;

    println!("{}", s2);

    let s3 = &s2[0..5];

    println!("{}", s3);
}
