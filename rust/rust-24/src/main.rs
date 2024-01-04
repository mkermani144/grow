// operator overloading

use std::ops::Add;

trait Printer {
    fn printer(&self);
}

type Usd = i16;

enum Salary {
    Weekly(Usd),
    Monthly(Usd),
    Yearly(Usd),
}

impl Add<Salary> for Salary {
    fn add(self, rhs: Self) -> Self::Output {
        match self {
            Self::Weekly(lhs) => {
                if let Self::Weekly(rhs) = rhs {
                    Ok(Self::Weekly(lhs + rhs))
                } else {
                    Err(String::from("Cannot add up different salary types"))
                }
            }
            Self::Monthly(lhs) => {
                if let Self::Monthly(rhs) = rhs {
                    Ok(Self::Monthly(lhs + rhs))
                } else {
                    Err(String::from("Cannot add up different salary types"))
                }
            }
            Self::Yearly(lhs) => {
                if let Self::Yearly(rhs) = rhs {
                    Ok(Self::Yearly(lhs + rhs))
                } else {
                    Err(String::from("Cannot add up different salary types"))
                }
            }
        }
    }

    type Output = Result<Self, String>;
}

fn main() {
    let lhs = Salary::Monthly(5000);
    let rhs = Salary::Monthly(10000);
    // let rhs = Salary::Weekly(1000);

    if let Ok(Salary::Monthly(sum)) = lhs + rhs {
        println!("Added: {}", sum)
    }
}
