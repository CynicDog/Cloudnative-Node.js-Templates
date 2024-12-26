# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies (both production and dev)
RUN npm install

# Step 5: Copy the entire application source code into the container
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build

# Step 7: Now use a smaller production image for runtime (optional)
FROM node:18-slim

# Step 8: Set the working directory in the container
WORKDIR /app

# Step 9: Set environment variables for CLIENT_ID and CLIENT_SECRET for runtime
ARG CLIENT_ID
ARG CLIENT_SECRET
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Step 10: Copy the built files from the build stage
COPY --from=build /app /app

# Step 11: Install only production dependencies
RUN npm install --only=production

# Step 12: Expose the app port
EXPOSE 3000

# Step 13: Start the application
CMD ["npm", "start"]
