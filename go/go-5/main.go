// switch

package main

import (
	"fmt"
	"time"
)

func main() {
	switch time.Now().Unix() % 2 {
	case 0:
		fmt.Println("even time")
	case 1:
		fmt.Println("odd time")
	default:
		fmt.Println("cannot happen")
	}
}
