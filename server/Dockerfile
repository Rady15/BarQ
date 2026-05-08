# Use Node.js official image
FROM node:20

# The official node image already has a user 'node' with UID 1000
# So we just use it instead of creating a new one
USER node
ENV PATH="/home/node/.local/bin:$PATH"

# Set working directory to the node user's home
WORKDIR /home/node/app

# Copy package files and install dependencies
# Note: we use --chown=node:node to ensure the files belong to our user
COPY --chown=node:node package*.json ./
RUN npm install

# Copy the rest of the application files
COPY --chown=node:node . .

# Set environment variables
ENV PORT=7860
ENV NODE_ENV=production

# Expose the required port
EXPOSE 7860

# Command to run the application
CMD [ "node", "index.js" ]
