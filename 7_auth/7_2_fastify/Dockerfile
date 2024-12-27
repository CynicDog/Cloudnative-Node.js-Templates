# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

ARG CLIENT_ID
ARG CLIENT_SECRET
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Expose the port the app will run on
EXPOSE 3000

# Start the Fastify application
CMD ["npm", "run", "start"]