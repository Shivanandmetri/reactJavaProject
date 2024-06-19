# Docker file 

# Use the official Node.js 19.2.0 image from the Docker Hub
FROM node:19.2.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the project for production
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 3000

# Command to run the React application
CMD ["npm", "start"]
