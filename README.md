### Cache
The Dockerfile caches every layer. Splitting it into two steps involves caching the package.json and npm install, with the only change in the "COPY . ./" step.

### Commands
Building the container:
```
docker build -t node-app-image . # Run this every time you change the Dockerfile
docker run -v $(pwd):/app -d -p 3000:3000 --name node-app node-app-image
docker exec -it node-app bash
docker logs
```

Removing the container forcefully:
```
docker rm node-app -f # Use the -f flag to force deletion even if the container is running
```

### Nodemon
Install nodemon for automatic restarts:
```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon -L index.js"
}
```

### node_modules Local Directory
Avoid deleting the node_modules folder on the local machine. Use the "-v /app/node_modules" flag to bind mount it and instruct Docker not to modify it.

### Create Files Inside the Container
For read-only bind mount to prevent creating files on the local machine:
```bash
docker run -v $(pwd)/:/app:ro -v /app/node_modules -d -p 3000:3000 --name node-app node-app-image
```

### Environment Variable
Setting environment variables:
```bash
docker run -v $(pwd)/:/app:ro -v /app/node_modules -d --env PORT=4000 -p 3000:4000 --name node-app node-app-image
printenv # Check environment variables
```
Or using an environment file:
```bash
docker run -v $(pwd)/:/app:ro -v /app/node_modules -d --env-file ./.env -p 3000:4000 --name node-app node-app-image
```

### Docker Volume
Persist Docker volumes:
```bash
docker volume ls # Check volumes
docker volume prune # Delete unnecessary (unused) volumes
```

### Actual Development
Automate with `docker-compose up -d` and delete containers with volumes using `docker-compose down -v`.

### Docker Compose
Specify build changes with `docker-compose up -d --build`. Use `docker-compose -f docker-compose.dev.yml` for development and `docker-compose -f docker-compose.prod.yml` for production.

### Production vs Development
Push different environments:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

### Mongo DBs
Basic MongoDB commands:
```bash
db
use mydb
show dbs
db.books.insert({"name": "harry potter"})
db.books.find()
show dbs
```
Access MongoDB shell with `docker exec -it mongo -u "ianubos" -p "mypassword"`.

### Docker Exec
Run commands inside Docker with `docker exec <container> <unix_commands>`.

### Custom Network
Containers can communicate. Check networks with `docker network ls` and inspect with `docker network inspect <container_name>`.

### Start Specific Service
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d <service_name>
```

### Docker Volumes
Preferred way for data persistence.

### Redis
Access Redis CLI with `docker exec -it docker_redis_1 redis-cli`.

### Load Balancing by Nginx
Check Express behind proxies. Run multiple instances with `docker-compose up -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2`.

### Watchtower
Auto-restart from Docker Hub changes:
```bash
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower app_node-app_1
```

### Upgrade Process
Deploy with Docker Swarm:
```bash
docker swarm init --advertise-addr <public_ip>
docker stack deploy -c docker-compose.prod.yml myapp
```

### Docker Swarm
Use `docker stack deploy` for orchestration. Check status with `docker stack ps myapp`.

### Deploy Cycle
Build, push, and deploy with Docker Swarm.

### Docker Hub
Push images to Docker Hub and pull in production.

### Watchtower Upgrade
Automatically detect Docker Hub changes with Watchtower.

### Upgrade Process
Use Container Orchestration (Docker Swarm) for smoother upgrades.

### Docker Swarm Commands
Check Swarm nodes and services with `docker node ls`, `docker stack ls`, and `docker stack services myapp`.

### Swarm Scaling
Scale replicas with `docker service update --replicas=<number> myapp_node-app`.

### Swarm Rolling Updates
Configure rolling updates in `docker-compose.prod.yml` under `update_config`.

### Redis Session
Use Redis for session storage with `docker exec -it docker_redis_1 redis-cli`.

### DigitalOcean Setup
Use DigitalOcean for the server, SSH into it, and install Docker and Docker Compose.

### Environmental Variables in Swarm
Set env variables in `docker-compose.prod.yml` and use `.env` file.

### Docker Stack Update
Update the stack with `docker stack deploy -c docker-compose.prod.yml myapp`.

### DigitalOcean SSH
SSH into the DigitalOcean server with `ssh root@<global_ip>`.

### Automatic Docker Installation
Run the automatic Docker installation script:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Docker Compose Upgrade
Upgrade Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Swarm Rolling Update
Update the stack with rolling updates:
```bash
docker stack deploy -c docker-compose.prod.yml myapp
```

### Docker Swarm Inspect
Inspect Swarm networks and nodes with `docker network inspect` and `docker node inspect`.

### Swarm Backup
Backup data with named volumes.

### Redis Session in Production
Use Redis for sessions and handle container deletion issues.

### Swarm Load Balancing
Load balance with multiple instances and Nginx.

### Swarm Specific Service Update
Update a specific service in Swarm:
```bash
docker service update --force myapp_node-app
```

### Swarm Downscale
Downscale replicas with `docker service scale myapp_node-app=2`.

### Watchtower Logs
Check Watchtower logs with `docker logs watchtower -f`.

### Swarm Teardown
Teardown Swarm with `docker swarm leave --force`.

### Swarm Network Cleanup
Clean up Swarm networks with `docker network prune`.

### Swarm Node Removal
Remove a node from Swarm with `docker node rm <node_id>`.

### Docker Inspect
Inspect container details with `docker inspect <container_name>`.

### Docker Volume Pruning
Prune unnecessary Docker volumes with `docker volume prune`.

### Redis Session Key
Find and retrieve a session key in Redis with `GET "sess:50-jxUBo3yuCt-wJ1S7ypj9sE57b_Nse"`

.

### Swarm Update Config
Configure Swarm update details in `docker-compose.prod.yml`.

### Swarm Stack Removal
Remove Swarm stack with `docker stack rm myapp`.

### Swarm Node IP
Get Swarm node IP with `docker inspect --format '{{ .Status.Addr }}' <node_id>`.

### Swarm Rolling Update Delay
Set delay in rolling updates with `delay` in `update_config`.

### Swarm Services Overview
List Swarm services with `docker service ls`.

### Swarm Rolling Update Parallelism
Configure parallelism in rolling updates with `parallelism` in `update_config`.

### Swarm Rolling Update Check
Check rolling update status with `docker stack ps myapp`.

### DigitalOcean SSH Password Reset
Reset SSH password on DigitalOcean from the website.

### Docker Swarm Service Removal
Remove a Swarm service with `docker service rm myapp_node-app`.

### Swarm Stack Service Update
Update a specific service in a Swarm stack:
```bash
docker service update --force myapp_node-app
```

### Swarm Service Rollback
Rollback a Swarm service update with `docker service rollback myapp_node-app`.

### Swarm Specific Container Update
Update a specific container in Swarm with `docker service update --force --detach=false myapp_node-app.<container_id>`.

### Swarm Service Logs
Check Swarm service logs with `docker service logs myapp_node-app`.

### Docker Hub Image Tag
Tag and push Docker Hub images:
```bash
docker image tag <image_name> <dockerhub_username>/<repository>
docker push <dockerhub_username>/<repository>
```

### Swarm Rolling Update Watch
Watch Swarm rolling update logs with `docker service logs -f myapp_node-app`.

### DigitalOcean Server Promotion
Use the $100 promotion and $5 minimum plan on DigitalOcean for free hosting.

### Swarm Downscale to 1
Downscale replicas to 1 with `docker service scale myapp_node-app=1`.

### Docker Compose Custom Network
Create a custom network in Docker Compose with `docker network create mynetwork`.

### Docker Swarm Stack Removal
Remove a Swarm stack with `docker stack rm myapp`.

### Docker Swarm Service Update
Update a Swarm service with `docker service update --force myapp_node-app`.

### Swarm Stack Update Image
Update a Swarm stack image with `docker stack deploy -c docker-compose.prod.yml --with-registry-auth myapp`.

### DigitalOcean IP Check
Check public and private IPs on DigitalOcean with `ip add`.

### Swarm Service Removal
Remove a Swarm service with `docker service rm myapp_node-app`.

### Swarm Replica Scaling
Scale Swarm replicas with `docker service scale myapp_node-app=3`.

### DigitalOcean SSH Reset
Reset SSH password on DigitalOcean from the website.

### Docker Swarm Downscale
Downscale Swarm replicas with `docker service scale myapp_node-app=1`.

### Swarm Stack Down
Take down a Swarm stack with `docker stack down myapp`.

### DigitalOcean SSH Access
Access DigitalOcean server with SSH using `ssh root@<global_ip>`.

### Swarm Rolling Update Interrupt
Interrupt a Swarm rolling update with `docker service update --force --rollback myapp_node-app`.

### Swarm Rolling Update Check Status
Check the status of a Swarm rolling update with `docker service ps myapp_node-app`.

### Swarm Rolling Update Progress
View the progress of a Swarm rolling update with `docker service inspect --pretty myapp_node-app`.

### DigitalOcean SSH Setup
Setup SSH access on DigitalOcean with `ssh-keygen` and `ssh-copy-id`.

### Docker Compose Scale
Scale Docker Compose services with `docker-compose up -d --scale node-app=3`.

### Swarm Node SSH
Access Swarm node via SSH with `ssh root@<node_ip>`.

### Docker Hub Image Push
Push Docker Hub image with `docker push <dockerhub_username>/<repository>`.

### Swarm Node Removal
Remove a Swarm node with `docker node rm <node_id>`.

### Swarm Stack Teardown
Teardown Swarm stack with `docker stack down myapp`.

### Swarm Specific Container Logs
Check logs for a specific container in Swarm with `docker service logs myapp_node-app.<container_id>`.

### Swarm Service Update Specific Container
Update a specific container in a Swarm service with `docker service update --detach=false myapp_node-app.<container_id>`.

### Docker Compose Down Specific Service
Take down a specific service with `docker-compose -f docker-compose.yml -f docker-compose.prod.yml down <service_name>`.

### DigitalOcean SSH Root Access
Access DigitalOcean server with root privileges via SSH.

### Swarm Rolling Update to Specific Image
Rolling update to a specific image in Swarm with `docker service update --force --image <new_image> myapp_node-app`.

### Swarm Service Update Delayed
Update Swarm service with a delayed start using `docker service update --force --update-delay 10s myapp_node-app`.

### Docker Swarm Stack Down
Take down a Swarm stack with `docker stack down myapp`.

### Docker Hub Image Pull
Pull Docker Hub image with `docker pull <dockerhub_username>/<repository>`.

### DigitalOcean Server Access
Access the DigitalOcean server with SSH using `ssh root@<global_ip>`.

### Docker Swarm Service Update Parallelism
Update Swarm service with parallelism using `docker service update --force --update-parallelism 2 myapp_node-app`.

### Swarm Rolling Update Watchtower
Use Watchtower for Swarm rolling updates with `docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower myapp_node-app`.

### Swarm Rolling Update Specific Container
Rolling update a specific container in Swarm with `docker service update --force --update-parallelism 1 myapp_node-app.<container_id>`.

### Swarm Rolling Update Delayed Start
Rolling update in Swarm with a delayed start using `docker service update --force --update-delay 10s myapp_node-app`.

### Docker Hub Image Pull Specific Tag
Pull specific tag of a Docker Hub image with `docker pull <dockerhub_username>/<repository>:<tag>`.

### Docker Swarm Stack Check
Check Swarm stack services with `docker stack services myapp`.

### Docker Hub Image Tag and Push
Tag and push Docker Hub image with `docker image tag <image_name> <dockerhub_username>/<repository>` and `docker push <dockerhub_username>/<repository>`.

### Swarm Rolling Update Multiple Services
Rolling update multiple services in Swarm with `docker service update --force myapp_node-app myapp_another-service`.

### Watchtower Container Restart
Restart a specific container with Watchtower using `docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower myapp_node-app`.

### Swarm Stack Down Services
Take down Swarm stack services with `docker stack rm myapp`.

### DigitalOcean Server SSH Password Reset
Reset SSH password on DigitalOcean server from the website.

### Docker Swarm Downscale Specific Service
Downscale a specific service in Swarm with `docker service scale myapp_node-app=1`.

### Docker Compose Up Specific Service
Bring up a specific service with Docker Compose using `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d <service_name>`.

### DigitalOcean Server SSH Root Access
Access DigitalOcean server with root privileges via SSH.

### Swarm Stack Update with New Image
Update Swarm stack with a new image using `docker stack deploy -c docker-compose.prod.yml --with-registry-auth myapp

`.

### Swarm Rolling Update Specific Container Image
Rolling update a specific container image in Swarm with `docker service update --force --image <new_image> myapp_node-app.<container_id>`.

### Swarm Service Update Image and Replicas
Update Swarm service with a new image and replicas using `docker service update --force --replicas 3 --image <new_image> myapp_node-app`.

### Swarm Rolling Update Specific Container Delayed
Rolling update a specific container with a delayed start using `docker service update --force --update-delay 10s myapp_node-app.<container_id>`.

### Swarm Stack Service Update Rollback
Rollback Swarm stack service update with `docker service rollback myapp_node-app`.

### Swarm Stack Teardown with Volume Removal
Teardown Swarm stack and remove volumes with `docker stack down --volumes myapp`.

### Swarm Service Update Rollback Specific Container
Rollback Swarm service update for a specific container with `docker service rollback --detach=false myapp_node-app.<container_id>`.

### Swarm Stack Update Image and Delay
Update Swarm stack with a new image and delayed start using `docker stack deploy -c docker-compose.prod.yml --with-registry-auth --with-registry-auth myapp`.

### Swarm Service Update Specific Container Rollback
Rollback Swarm service update for a specific container with `docker service rollback --detach=false myapp_node-app.<container_id>`.

### Swarm Rolling Update Delayed Start Specific Container
Rolling update a specific container in Swarm with a delayed start using `docker service update --force --update-delay 10s myapp_node-app.<container_id>`.

### Swarm Stack Teardown with Service Removal
Teardown Swarm stack and remove services with `docker stack down --services myapp`.