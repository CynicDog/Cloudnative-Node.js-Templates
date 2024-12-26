# Step 1: Use an official Node.js image as the base image
FROM node:16 AS build

# Step 2: Set build-time arguments for CLIENT_ID and CLIENT_SECRET
ARG CLIENT_ID
ARG CLIENT_SECRET

# Step 3: Set the working directory in the container
WORKDIR /app

# Step 4: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 5: Install the dependencies (both production and dev)
RUN npm install

# Step 6: Copy the entire application source code into the container
COPY . .

# Step 7: Set environment variables using the injected ARG values
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Step 8: Build the TypeScript code
RUN npm run build

# Step 9: Use a smaller production image for runtime (optional)
FROM node:16-slim

# Step 10: Set the working directory in the container
WORKDIR /app

# Step 11: Copy the built files from the build stage
COPY --from=build /app /app

# Step 12: Install only production dependencies
RUN npm install --only=production

# Step 13: Expose the app port
EXPOSE 3000

# Step 14: Start the application
CMD ["npm", "start"]