FROM node:latest

# Prepare app directory
RUN mkdir -p /app
ADD . /app

# Install dependencies
WORKDIR /app
RUN npm i -g create-react-native-app
RUN cd /app && npm install

# Build the app
RUN npm build

# Start the app
CMD npm start
