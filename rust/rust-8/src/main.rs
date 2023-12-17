// basic data structures

use std::collections::{BinaryHeap, HashMap, HashSet, LinkedList};

fn main() {
    let a: isize = -46;
    let b: usize = 55;
    let c: f64 = 1.01;

    let d: bool = false;

    let e: char = 'c';

    let f: (isize, usize, bool) = (-5, 5, true);
    let f0 = f.0;
    let f1 = f.1;

    let g: [isize; 8] = [-1, 1, 0, -1, 1, 0, 0, 0];
    let g2 = g[2];

    let h: Vec<bool> = vec![false, false];

    let i: String = String::from("hello world");
    let j: &str = &i[0..5];

    let k: HashMap<usize, bool> = HashMap::from([(2, false), (3, true)]);
    let l: HashSet<usize> = HashSet::from([2, 3]);

    let m: LinkedList<usize> = LinkedList::from([1, 2, 3]);

    let n: BinaryHeap<usize> = BinaryHeap::from([1, 5, 2]);
}
