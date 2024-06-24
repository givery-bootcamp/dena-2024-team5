.PHONY: swag
swag:
	docker-compose exec backend sh -c "swag init --requiredByDefault"
test:
	cd backend && IS_TEST=1 go test ./...
