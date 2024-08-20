# Use an official Node.js image as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["sh", "-c", "npm run migrate && npm run seed && npm start"]
