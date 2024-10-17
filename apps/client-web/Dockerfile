# Phase 1: Build client-web application
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# git clone project
RUN git clone https://github.com/JCLChengChing/community-voting-system-monorepo

# Install pnpm (assuming the Rush.js project uses pnpm)
RUN npm install -g pnpm

# Install Rush.js
RUN npm install -g @microsoft/rush

# Set working directory
WORKDIR /app/community-voting-system-monorepo

# Install project dependencies
RUN rush update

# Package shared module
WORKDIR /app/community-voting-system-monorepo/packages/shared
RUN rushx build

# Package client-web application
WORKDIR /app/community-voting-system-monorepo/apps/client-web
RUN rushx build

# Phase 2: Set up NGINX and run the service
FROM nginx:alpine AS runner

# Copy the packaged client-web file to the static service directory of NGINX
COPY --from=builder /app/community-voting-system-monorepo/apps/client-web/dist /usr/share/nginx/html

# Copy custom NGINX configuration file (optional)
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 of NGINX
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]


# $ docker build -f ./Dockerfile -t client-web . --no-cache