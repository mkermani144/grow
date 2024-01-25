// simple functions

package main

import (
	"fmt"
)

func plus(a int, b int, c int) (aPlusB int, bPlusC int) {
	aPlusB = a + b
	bPlusC = b + c

	return
}

func main() {
	x, y := plus(1, 2, 3)

	fmt.Println(x, y)
}
