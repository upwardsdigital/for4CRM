# Use a base image
FROM alpine:latest

# Set working directory (optional)
WORKDIR /app

# Copy files into the container (optional)
# COPY . .

# Run commands during build (optional)
# RUN apk add --no-cache curl

# Define the container startup command
CMD ["echo", "Hello, World!"]
