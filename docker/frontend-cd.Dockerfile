FROM node:20-alpine
WORKDIR /usr/app
COPY frontend /usr/app/

# use build args
ARG NEXT_AUTH_SECRET_KEY
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXTAUTH_URL

RUN echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}" >> /usr/app/.env.production
RUN echo "AUTH_SECRET=${NEXT_AUTH_SECRET_KEY}" >> /usr/app/.env.production
RUN echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> /usr/app/.env.production
RUN npm install -g pnpm
RUN pnpm install && pnpm build
EXPOSE 3000
ENTRYPOINT ["pnpm", "start"]
