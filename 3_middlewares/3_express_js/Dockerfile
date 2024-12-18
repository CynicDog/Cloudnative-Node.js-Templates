# Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application files
COPY . .

# Production Stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["node", "src/main.js"]