# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 3: Set the working directory in the container
WORKDIR /app

# Step 4: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 5: Install dependencies (both production and dev)
RUN npm install

# Step 6: Copy the entire application source code into the container
COPY . .

# Step 7: Build the TypeScript code
RUN npm run build

# Step 8: Now use a smaller production image for runtime (optional)
FROM node:18-slim

# Step 9: Set the working directory in the container
WORKDIR /app

# Step 10: Set environment variables for CLIENT_ID and CLIENT_SECRET for runtime
# These will be passed during build and made available in the final image
ARG CLIENT_ID
ARG CLIENT_SECRET
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Step 11: Copy the built files from the build stage
COPY --from=build /app /app

# Step 12: Install only production dependencies
RUN npm install --only=production

# Step 13: Expose the app port
EXPOSE 3000

# Step 14: Start the application
CMD ["npm", "start"]
