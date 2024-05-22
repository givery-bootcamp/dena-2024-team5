FROM ubuntu:22.04
WORKDIR /app
COPY backend/myapp /app

ENTRYPOINT ["pwd && ls -l && ./myapp"]
