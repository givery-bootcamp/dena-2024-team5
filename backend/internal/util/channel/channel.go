package channel

import (
	"fmt"
	"log"
	"myapp/internal/constant"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Message struct {
	UserID  uint   `json:"userId"`
	PostID  uint   `json:"postId"`
	Message string `json:"message"`
}

type MessageChan struct {
	Channel chan Message
	UserID  uint
}

type Broker struct {
	// Events are pushed to this channel by the main events-gathering routine
	Notifier chan Message

	// New client connections are pushed to this channel
	newClients chan MessageChan

	// Closed client connections are pushed to this channel
	closingClients chan chan Message

	// Client connections registry
	clients map[chan Message]uint
}

func NewServer() (broker *Broker) {
	// Instantiate a broker
	broker = &Broker{
		Notifier:       make(chan Message, 1),
		newClients:     make(chan MessageChan),
		closingClients: make(chan chan Message),
		clients:        make(map[chan Message]uint),
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
			fmt.Println("s=", s)
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
			fmt.Println("broker.Notifier")
			fmt.Println(broker.clients)
			for clientMessageChan, userId := range broker.clients {
				fmt.Println("userID", userId, event.UserID)
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
	fmt.Println("userID", userID)
	// Check if the ResponseWriter supports flushing.
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
		return
	}

	// Each connection registers its own message channel with the Broker's connections registry
	messageChan := make(chan Message)

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
		case msg := <-messageChan:
			// Write to the ResponseWriter
			// Server Sent Events compatible
			fmt.Fprintf(w, "data: %v\n\n", msg)
			// Flush the data immediately instead of buffering it for later.
			flusher.Flush()
		}
	}
}

func (broker *Broker) SendNotification(msg Message) error {
	// Send the message to the broker via Notifier channel
	broker.Notifier <- msg
	log.Println("Message sent")
	return nil
}
