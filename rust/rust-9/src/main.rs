// advanced data structures 1

use std::{
    collections::{BTreeMap, BTreeSet},
    rc::Rc,
    sync::Arc,
    thread,
};

fn main() {
    println!("BTreeMap: ");
    let a: BTreeMap<isize, bool> = BTreeMap::from([(2, false), (3, true), (7, false), (1, false)]);
    for (key, value) in &a {
        println!("key: {}, value: {}", key, value)
    }

    println!("BTreeSet: ");
    let b: BTreeSet<isize> = BTreeSet::from([1, 2, 6, 3, 2, 2, 0]);
    for item in &b {
        println!("{}", item)
    }

    println!("Rc: ");
    let c: Rc<usize> = Rc::new(5);
    let c0 = c.clone();
    let c1 = &c;
    let c2 = &c;
    let c3 = &c;
    println!("{}, {}", Rc::weak_count(&c), Rc::strong_count(&c));
    println!("{}, {}, {}, {}", c1, c2, c3, c0);

    println!("Arc: ");
    let d: Arc<isize> = Arc::new(5);
    let d_clone = d.clone();
    thread::spawn(move || {
        println!("{d_clone:?}");
    });
}
