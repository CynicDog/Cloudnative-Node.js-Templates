# Phase 1: Build
FROM node:20 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Phase 2: Runtime
FROM node:20-alpine AS runtime

# Set working directory inside the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]
