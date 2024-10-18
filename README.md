# Community Voting System Deployment Guide

This guide outlines the steps to deploy a community voting system to Google Cloud Platform (GCP) using Docker Swarm orchestration.

## Step 1: Set Up GCP Environment

1. Create a new Compute Engine instance to serve as your Swarm manager node.
2. SSH into the instance.

## Step 2: Install Docker and Docker Compose

Run the following commands on the manager node:

```bash
sudo apt-get update
sudo apt-get install docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
newgrp docker
```

## Step 3: Build Docker Images

Navigate to each application directory and build the Docker images:

```bash
cd ~/community-voting-system-monorepo/apps/client-web && docker build -f ./Dockerfile -t client-web . --no-cache
cd ~/community-voting-system-monorepo/apps/admin-web && docker build -f ./Dockerfile -t admin-web . --no-cache
cd ~/community-voting-system-monorepo/apps/api-server && docker build -f ./Dockerfile -t api-server . --no-cache
```

## Step 4: Initialize Docker Swarm

On the manager node:

```bash
cd ~/community-voting-system-monorepo/apps/docker
docker swarm init
```

This will output a token for worker nodes to join the swarm.

## Step 5: Deploy the Stack

On the manager node:

```bash
docker stack deploy -c docker-compose.yml cvs_stack
```

## Step 6: Verify Deployment

Check the status of your deployment:

```bash
docker stack ls
docker service ls
```

## Step 7: Add Worker Nodes (Optional)

To add worker nodes to your swarm:

1. Create additional Compute Engine instances.
2. SSH into each instance.
3. Install Docker using the commands from Step 2.
4. Join the swarm using the token provided in Step 4:

```bash
docker swarm join --token <YOUR_TOKEN> <MANAGER_IP>:<MANAGER_PORT>
```

## Management Commands

- Remove the stack: `docker stack rm cvs_stack`
- List nodes in the swarm: `docker node ls`
- Remove network: `docker network prune`

### Adding a Manager to the Swarm

To add another manager to the swarm:

1. On an existing manager node, run:
   ```bash
   docker swarm join-token manager
   ```
2. Execute the provided command on the new manager node to join the swarm.

## Firewall Configuration

When setting up your swarm, ensure the following ports are open:

- TCP 2377: Used for cluster management communication
- TCP and UDP 7946: Used for network communication between nodes
- UDP 4789: Used for data transmission in the Overlay network

Update your firewall or security group rules accordingly.

## Monitoring and Managing the Swarm

### Checking Nodes

To view all nodes in the swarm:

```bash
docker node ls
```

This command shows the ID, hostname, status, availability, and manager status of each node.

To inspect a specific node:

```bash
docker node inspect <NODE_ID>
```

### Checking Services

To list all services in the swarm:

```bash
docker service ls
```

To view detailed information about a specific service:

```bash
docker service ps <SERVICE_NAME>
```

To inspect a service:

```bash
docker service inspect <SERVICE_NAME>
```

### Rollout and Rollback

#### Rolling Update

To perform a rolling update of a service:

```bash
docker service update --image <NEW_IMAGE> <SERVICE_NAME>
```

For example, to update the client-web service:

```bash
docker service update --image client-web:v2 cvs_stack_client-web
```

#### Rollback

To rollback a service to its previous version:

```bash
docker service rollback <SERVICE_NAME>
```

For example:

```bash
docker service rollback cvs_stack_client-web
```

#### Monitoring Update/Rollback Progress

To watch the progress of an update or rollback:

```bash
docker service ps <SERVICE_NAME>
```

This will show you the status of each task (container) in the service, including whether it's running the new or old version.

## Accessing the Application

### Admin Page
To access the admin page:
1. Find the external IP of any Swarm node VM instance in your GCP Console.
2. Open a web browser and enter the following URL:
   `http://<EXTERNAL_IP>/_admin`
   (Note: Replace `<EXTERNAL_IP>` with the actual external IP address)
3. If you encounter a security warning due to HTTPS, simply remove the 's' from 'https' in the URL.

### Client Page
To access the client page:
1. Use the same external IP as above.
2. Enter the following URL in your web browser:
   `http://<EXTERNAL_IP>/web`
   (Note: Replace `<EXTERNAL_IP>` with the actual external IP address)
3. As with the admin page, if you encounter an HTTPS warning, remove the 's' from 'https' in the URL.


During the meeting, each user is able to scan the QRcode to access the client page on their smartphone, this allows a more convenient and intuitive approach. 

