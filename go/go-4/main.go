// if else

package main

import "fmt"

func main() {
	i := 2
	if i < 3 {
		fmt.Println("smaller")
	} else {
		fmt.Println("larger")
	}

	if j := 3; j < 5 {
		fmt.Println("smaller")
	}
}
