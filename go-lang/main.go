package main

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

const (
	broker1Address = "localhost:9092"
	broker2Address = "localhost:9093"
	broker3Address = "localhost:9094"
)

func producer(ctx context.Context) {
	config := kafka.WriterConfig{
		Brokers: []string{broker1Address, broker2Address, broker3Address},
	}

	writer := kafka.NewWriter(config)

	err := writer.WriteMessages(ctx, kafka.Message{Topic: "user", Value: []byte("Hello")})
	if err != nil {
		fmt.Println("Error: ", err)
	}
}

// func consumer(ctx context.Context) {
// 	config := kafka.ReaderConfig{
// 		Brokers:  []string{broker1Address, broker2Address, broker3Address},
// 		Topic:    "user",
// 		GroupID:  "user-consumer",
// 		MaxBytes: 10,
// 	}

// 	reader := kafka.NewReader(config)

// 	for {
// 		m, err := reader.ReadMessage(context.Background())
// 		if err != nil {
// 			fmt.Println("Some error occured", err)
// 			break
// 		}
// 		fmt.Println("Message is : ", string(m.Value))
// 	}
// }

func main() {
	fmt.Println("Start Producing")
	// for range []int{1, 2, 3} {
	producer(context.Background())
	// }
	// consumer(context.Background())
}
