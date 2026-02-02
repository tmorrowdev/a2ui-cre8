FROM node:22-slim AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

WORKDIR /app

# Copy monorepo root files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy all packages (demo depends on workspace packages)
COPY packages ./packages
COPY apps/demo ./apps/demo
COPY apps/cre8-mcp/data ./apps/cre8-mcp/data

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Build demo (prebuild copies components, then vite builds)
RUN pnpm --filter @a2ui-bridge/demo build

# Production stage - serve static files
FROM node:22-slim

RUN npm install -g sirv-cli

WORKDIR /app

COPY --from=builder /app/apps/demo/dist ./dist

CMD ["sirv", "dist", "--single", "--host", "0.0.0.0"]
