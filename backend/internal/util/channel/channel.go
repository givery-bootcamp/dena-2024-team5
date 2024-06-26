package channel

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Message struct {
	UserID    uint   `json:"userId"`
	PostTitle string `json:"postTitle"`
	Message   string `json:"message"`
}

type Broker struct {
	// Events are pushed to this channel by the main events-gathering routine
	Notifier chan []byte

	// New client connections are pushed to this channel
	newClients chan chan []byte

	// Closed client connections are pushed to this channel
	closingClients chan chan []byte

	// Client connections registry
	clients map[chan []byte]bool
}

func NewServer() (broker *Broker) {
	// Instantiate a broker
	broker = &Broker{
		Notifier:       make(chan []byte, 1),
		newClients:     make(chan chan []byte),
		closingClients: make(chan chan []byte),
		clients:        make(map[chan []byte]bool),
	}

	// Set it running - listening and broadcasting events
	go broker.listen()

	return
}

func (broker *Broker) listen() {
	for {
		select {
		case s := <-broker.newClients:

			// A new client has connected.
			// Register their message channel
			broker.clients[s] = true
			log.Printf("Client added. %d registered clients", len(broker.clients))
		case s := <-broker.closingClients:

			// A client has dettached and we want to
			// stop sending them messages.
			delete(broker.clients, s)
			log.Printf("Removed client. %d registered clients", len(broker.clients))
		case event := <-broker.Notifier:

			// We got a new event from the outside!
			// Send event to all connected clients
			for clientMessageChan := range broker.clients {
				clientMessageChan <- event
			}
		}
	}
}

func (broker *Broker) Stream(c *gin.Context) {
	// Get the ResponseWriter and Request from gin.Context
	w := c.Writer
	r := c.Request

	// Check if the ResponseWriter supports flushing.
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}

	// Each connection registers its own message channel with the Broker's connections registry
	messageChan := make(chan []byte)

	// Signal the broker that we have a new connection
	broker.newClients <- messageChan

	// Remove this client from the map of connected clients when this handler exits.
	defer func() {
		broker.closingClients <- messageChan
	}()

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	for {
		select {
		// Listen to connection close and un-register messageChan
		case <-r.Context().Done():
			// remove this client from the map of connected clients
			broker.closingClients <- messageChan
			return

		// Listen for incoming messages from messageChan
		case msg := <-messageChan:
			// Write to the ResponseWriter
			// Server Sent Events compatible
			fmt.Fprintf(w, "data: %s\n\n", msg)
			// Flush the data immediately instead of buffering it for later.
			flusher.Flush()
		}
	}
}

func (broker *Broker) BroadcastMessage(msg Message) error {
	// Send the message to the broker via Notifier channel
	j, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	broker.Notifier <- []byte(j)
	log.Println("Message sent")
	return nil
}
