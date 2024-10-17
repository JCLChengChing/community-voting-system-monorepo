# Select base image file
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


# Packaging project (execute packaging commands according to requirements, assuming it is rush build)
# RUN rush build

WORKDIR /app/community-voting-system-monorepo/packages/shared
RUN rushx build



# Package for api-server project
WORKDIR /app/community-voting-system-monorepo/apps/api-server
RUN rushx build
RUN rushx build:isolate
# WORKDIR /app/community-voting-system-monorepo/apps/api-server/isolate
# RUN pnpm install


# Second phase: Run the application (Runner)
FROM node:20-alpine AS runner

# Set working directory
WORKDIR/app

# Copy the packaged files from the builder stage to the runner
COPY --from=builder /app/community-voting-system-monorepo/apps/api-server/isolate ./api-server
WORKDIR /app/api-server
RUN npm install -g pnpm
RUN pnpm install

#Expose service running port
EXPOSE 8080

# Start the application and use the npm command to execute it
CMD ["npm", "run", "start", "--prefix", "./api-server"]

# $ docker build -f ./Dockerfile -t api-server . --no-cache