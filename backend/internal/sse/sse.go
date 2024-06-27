package sse

import (
	"fmt"
	"log"
	"myapp/internal/constant"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Messager struct {
	UserID  uint   `json:"userId"`
	Message string `json:"message"`
}

type MessageChan struct {
	Channel chan Messager
	UserID  uint
}

type Broker struct {
	// Events are pushed to this channel by the main events-gathering routine
	Notifier chan Messager

	// New client connections are pushed to this channel
	newClients chan MessageChan

	// Closed client connections are pushed to this channel
	closingClients chan chan Messager

	// Client connections registry
	clients map[chan Messager]uint
}

func NewServer() (broker *Broker) {
	// Instantiate a broker
	broker = &Broker{
		Notifier:       make(chan Messager, 1),
		newClients:     make(chan MessageChan),
		closingClients: make(chan chan Messager),
		clients:        make(map[chan Messager]uint),
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
			broker.clients[s.Channel] = s.UserID
			log.Printf("Client added. %d registered clients", len(broker.clients))
		case s := <-broker.closingClients:

			// A client has dettached and we want to
			// stop sending them messages.
			delete(broker.clients, s)
			log.Printf("Removed client. %d registered clients", len(broker.clients))
		case event := <-broker.Notifier:

			// We got a new event from the outside!
			// Send event to all connected clients
			for clientMessageChan, userId := range broker.clients {
				if userId != event.UserID {
					continue
				}
				clientMessageChan <- event
			}
		}
	}
}

func (broker *Broker) Stream(c *gin.Context) {
	// Get the ResponseWriter and Request from gin.Context
	w := c.Writer
	r := c.Request

	// jwtからユーザーID取る
	userID, ok := c.Value(constant.GIN_CONTEXT_USERID).(uint)
	if !ok {
		log.Println("user id not found")
		return
	}
	// Check if the ResponseWriter supports flushing.
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}

	// Each connection registers its own message channel with the Broker's connections registry
	messageChan := make(chan Messager)

	// Signal the broker that we have a new connection
	broker.newClients <- MessageChan{
		Channel: messageChan,
		UserID:  userID,
	}

	// Remove this client from the map of connected clients when this handler exits.
	defer func() {
		broker.closingClients <- messageChan
	}()

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	for {
		select {
		// Listen to connection close and un-register messageChan
		case <-r.Context().Done():
			// remove this client from the map of connected clients
			broker.closingClients <- messageChan
			return

		// Listen for incoming messages from messageChan
		case msgr := <-messageChan:
			// Write to the ResponseWriter
			// Server Sent Events compatible
			fmt.Fprintf(w, "data: %s\n\n", msgr.Message)
			// Flush the data immediately instead of buffering it for later.
			flusher.Flush()
		}
	}
}

func (broker *Broker) SendNotification(msg Messager) error {
	// Send the message to the broker via Notifier channel
	broker.Notifier <- msg
	log.Println("Message sent")
	return nil
}
