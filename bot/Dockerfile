# Use Node.js v16 as base image for building build folder
FROM node:16 as development

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN yarn install

# Copy all files from current directory to working directory
COPY . .

# Build TypeScript app
RUN yarn build

# Start the Discord bot
# CMD ["node", "build/index.js"]

############################################################

# Use Node.js v16 as base image for final production
FROM node:16 as production

#
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies for production
RUN yarn install --only=production

# Copy .env file
COPY .env ./
# COPY features.json ./

# Copy Folder
# COPY ./assets ./assets

# Copy all files from development build
COPY --from=development /app/build ./build

# Start the Discord bot
CMD ["node", "build/index.js"]

############################################################