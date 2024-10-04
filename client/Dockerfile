# Development Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy the source code to the container
COPY . .

EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
