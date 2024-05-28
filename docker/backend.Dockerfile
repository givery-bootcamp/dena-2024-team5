FROM golang:1.22

ENV PATH $(go env GOPATH)/bin:$PATH

RUN mkdir /go/src/myapp
WORKDIR /go/src/myapp

RUN go install github.com/swaggo/swag/cmd/swag@v1.16.3
RUN go install github.com/cosmtrek/air@v1.51.0
