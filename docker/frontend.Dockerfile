FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ./frontend /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
EXPOSE 8000
CMD [ "pnpm", "dev" ]