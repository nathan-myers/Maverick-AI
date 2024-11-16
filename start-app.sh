#!/bin/bash
# Check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

# Load environment variables
source .env

# Start the application
docker-compose up --build

# docker-compose down
#docker-compose up --build

# chmod +x start-app.sh
# ./start-app.sh



#docker-compose.yml

#version: '3.8'
#
#services:
#  app:
#    build:
#      context: .
#      args:
#        - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
#        - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
#    ports:
#      - "3000:80"
#    environment:
#      - NODE_ENV=production