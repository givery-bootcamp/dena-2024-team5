FROM node:20-alpine
WORKDIR /usr/app
COPY frontend /usr/app/
RUN npm install -g pnpm
RUN pnpm install && pnpm build
EXPOSE 3000
ENTRYPOINT ["pnpm", "start"]
