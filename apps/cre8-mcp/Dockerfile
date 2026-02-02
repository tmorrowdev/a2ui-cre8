FROM node:22-slim

WORKDIR /app

# Copy package files and source (context is apps/cre8-mcp)
COPY package.json tsconfig.json ./
COPY src ./src
COPY data ./data

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
