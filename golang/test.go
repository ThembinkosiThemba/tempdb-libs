package main

import (
	"fmt"
	"log"

	tempdb "github.com/ThembinkosiThemba/tempdb-go/lib"
)

func main() {
	apiKey := "6828c7ef6604a7721140f6559bae4ac5ebb72732c431a72b67ee2397dcf31da5"

	// apiKey := os.Getenv("API_KEY")
	/// The NewCLient function initialises the client and takes 3 parameters
	/// 1. The address, either locally is ran there, or on a hosted client which is comming soon.
	/// 2. The database, this is the database you will be using to store data using the client.
	/// 3. Token, for access control, you will need to provide
	client, err := tempdb.NewClient("0.0.0.0:8080", "ecommerce-store", apiKey)
	if err != nil {
		log.Fatalf("Failed to get client: %v", err)
	}
	defer client.Close()

	// Example usage when storing product information
	response, err := client.SetData("p:9", map[string]interface{}{
		"name":      "Laptop",
		"price":     999.99,
		"stock":     50,
		"Locations": "US",
	})
	if err != nil {
		log.Printf("Error setting user info: %v", err)
	} else {
		fmt.Println("Set user info response:", response)

	}

	// getting a particular product information
	getProductInfo, err := client.Get("p:1")
	if err != nil {
		log.Println("failed to get :", err)
	} else {
		log.Println("data: ", getProductInfo)
	}
}
