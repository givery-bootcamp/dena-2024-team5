package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var HostName = "127.0.0.1"
var Port = 9000
var CorsAllowOrigin = "http://localhost:3000"
var DBHostName = "db"
var DBUserName = "root"
var DBPassword = ""
var DBPort = 3306
var DBName = "training"
var AuthSecretKey = ""

func init() {
	if v := os.Getenv("HOSTNAME"); v != "" {
		HostName = v
	}
	if v, err := strconv.ParseInt(os.Getenv("PORT"), 10, 64); err == nil {
		Port = int(v)
	}
	if v := os.Getenv("CORS_ALLOW_ORIGIN"); v != "" {
		CorsAllowOrigin = v
	}
	if v := os.Getenv("DB_HOSTNAME"); v != "" {
		DBHostName = v
	}
	if v := os.Getenv("DB_USERNAME"); v != "" {
		DBUserName = v
	}
	if v := os.Getenv("DB_PASSWORD"); v != "" {
		DBPassword = v
	}
	if v, err := strconv.ParseInt(os.Getenv("DB_PORT"), 10, 64); err == nil {
		DBPort = int(v)
	}
	if v := os.Getenv("DB_NAME"); v != "" {
		DBName = v
	}
	if v := os.Getenv("AUTH_SECRET_KEY"); v != "" {
		AuthSecretKey = v
	} else {
		// テスト時はスキップ
		if is := os.Getenv("IS_TEST"); is == "1" {
			return
		}
		// localなら.envから読み込む
		err := godotenv.Load()
		if err != nil {
			panic("Error loading .env file")
		}
		AuthSecretKey = os.Getenv("SECRET_KEY")
	}
}
