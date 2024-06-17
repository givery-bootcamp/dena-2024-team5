.PHONY: swag
swag:
	docker-compose exec backend sh -c "swag init --requiredByDefault"
