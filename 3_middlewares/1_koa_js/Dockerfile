# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application files
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "src/main.js"]
