
# Stage 1: Build the React app using Node
FROM node:alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json /app

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration file (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
