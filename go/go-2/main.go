// variables

package main

import "fmt"

var global int

func main() {
	local := "local"

	fmt.Println(global)
	fmt.Println(local)
}
