FROM node:20-alpine
WORKDIR /usr/app
COPY frontend /usr/app/

# use build args
ARG NEXT_AUTH_SECRET_KEY
ARG API_BASE_URL

RUN echo "API_BASE_URL=${API_BASE_URL}" >> /usr/app/.env.production
RUN echo "AUTH_SECRET=${NEXT_AUTH_SECRET_KEY}" >> /usr/app/.env.production
RUN npm install -g pnpm
RUN pnpm install && pnpm build
EXPOSE 3000
ENTRYPOINT ["pnpm", "start"]
