package controller

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Notification struct {
	ID        uint
	UserID    uint
	PostID    uint
	Message   string
	CreatedAt time.Time
}

func StreamNotifications(c *gin.Context, db *gorm.DB) {
	postID := uint(1)
	// userID := 1
	clientGone := c.Writer.CloseNotify()
	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")
	// postID := c.Param("post_id")
	// c.Stream(func(w io.Writer) bool {
	// 	notifs := getNewNotifications(postID, db)
	// 	fmt.Println("読み取り開始")
	// 	fmt.Println(notifs)
	// 	for _, notification := range notifs {
	// 		c.SSEvent("message", notification.Message)
	// 		// Optionally mark as sent or delete
	// 		db.Debug().Delete(&notification)
	// 	}
	// 	time.Sleep(1 * time.Second) // Prevent too many requests
	// 	return true
	// })
	for {
		select {
		case <-time.After(1 * time.Second):
			fmt.Println("読み取り開始")
			var notifications []Notification
			db.Where("post_id = ?", postID).Order("created_at ASC").Find(&notifications)
			fmt.Println(notifications)
			for _, notification := range notifications {
				fmt.Fprintf(c.Writer, "data: %s\n\n", notification.Message)
				// Mark as processed or delete the notification after it is sent
				db.Debug().Delete(&notification)
			}
			// fmt.Fprintf(c.Writer, "data: %s\n\n", time.Now().Format(time.RFC3339))
			c.Writer.Flush()
		case <-clientGone:
			return
		}
	}
}

func getNewNotifications(postID uint, db *gorm.DB) []Notification {
	var notifications []Notification
	db.Where("post_id = ?", postID).Order("created_at ASC").Find(&notifications)
	return notifications
}
