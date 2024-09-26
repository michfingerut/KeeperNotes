# Use Node.js image for building the React app
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build the React app for production
RUN npm run build

# Serve the app with an nginx server
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
