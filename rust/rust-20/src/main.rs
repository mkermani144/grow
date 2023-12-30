// basic threads

use std::time::Instant;

fn fib(n: i8) -> isize {
    if n == 1 {
        return 1;
    }
    if n == 2 {
        return 2;
    }

    fib(n - 1) + fib(n - 2)
}

fn fac(n: i8) -> isize {
    if n == 1 {
        return 1;
    }

    if n == 2 {
        return 2;
    }

    fac(n - 1) * fac(n - 2)
}

fn main() {
    let now = Instant::now();
    let handle11 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fib(20);
        }
    });
    let handle12 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fib(20);
        }
    });
    let handle13 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fib(20);
        }
    });
    let handle14 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fib(20);
        }
    });
    let handle15 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fib(20);
        }
    });
    let handle21 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fac(10);
        }
    });
    let handle22 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fac(10);
        }
    });
    let handle23 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fac(10);
        }
    });
    let handle24 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fac(10);
        }
    });
    let handle25 = std::thread::spawn(|| {
        for _ in 0..20000 {
            fac(10);
        }
    });
    handle11.join().unwrap();
    handle12.join().unwrap();
    handle13.join().unwrap();
    handle14.join().unwrap();
    handle15.join().unwrap();
    handle21.join().unwrap();
    handle22.join().unwrap();
    handle23.join().unwrap();
    handle24.join().unwrap();
    handle25.join().unwrap();
    println!("multi-thread: {}", now.elapsed().as_millis());

    let now = Instant::now();
    for _ in 0..100000 {
        fib(20);
        fac(10);
    }
    println!(
        "single-threaded version done in {}",
        now.elapsed().as_millis()
    );
}
