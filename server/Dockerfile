# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on (make sure to match this with your Express app)
EXPOSE 3002

# Command to run your application
CMD ["npm", "run","start:dev"]

