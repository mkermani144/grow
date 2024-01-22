// for loop

package main

import "fmt"

func main() {
	fmt.Println("i")
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	fmt.Println("j")
	j := 0
	for {
		fmt.Println(j)
		j++
		if j >= 10 {
			break
		}
	}
}
