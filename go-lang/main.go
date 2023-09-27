package main

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

const (
	topic          = "message-log"
	broker1Address = "localhost:9092"
	broker2Address = "localhost:9093"
	broker3Address = "localhost:9094"
)

func main() {
	conf := kafka.ReaderConfig{
		Brokers:  []string{broker1Address, broker2Address, broker3Address},
		Topic:    "user",
		GroupID:  "user-consumer",
		MaxBytes: 10,
	}

	reader := kafka.NewReader(conf)

	fmt.Println("Start listening")

	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			fmt.Println("Some error occured", err)
			break
		}
		fmt.Println("Message is : ", string(m.Value))
	}

}
