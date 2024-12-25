const http = require('http');
const dns = require('dns');
const Redis = require('ioredis');

const podIP = process.env.CURRENT_POD_IP;
const port = process.env.HTTP_PORT || 8080;
const serviceName = process.env.SERVICE_NAME || 'node-app.default.svc.cluster.local';
const redisHost = process.env.REDIS_HOST || "localhost";

const redis = new Redis({
    host: redisHost
    }
); // Connect to Redis

class ClusterManager {
    constructor() {
        this.currentPodIp = podIP;
        this.isReady = false;
        this.clusterKey = 'cluster:members';
    }

    async discoverClusterMembers() {
        try {
            const nodes = await resolveClusterNodes();
            for (const node of nodes) {
                const isNewNode = await redis.sadd(this.clusterKey, node);
                if (isNewNode) {
                    console.log(`Discovered new node IP: ${node}`);
                }
            }
        } catch (err) {
            console.error('Failed to resolve cluster members:', err);
        }
    }

    async startCluster() {
        // Start listening for requests
        this.listenForRequests();

        // Add the current node to the Redis cluster set
        await redis.sadd(this.clusterKey, this.currentPodIp);
        console.log(`Cluster initialized with node ${this.currentPodIp}`);

        // Periodically update cluster members
        setInterval(() => {
            this.discoverClusterMembers();
        }, 3000);

        // Periodically update node presence
        setInterval(async () => {
            await redis.expire(this.clusterKey, 10);
        }, 5000);

        this.isReady = true;
    }

    listenForRequests() {
        const server = http.createServer(async (req, res) => {
            if (req.url === '/health') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'ok', message: 'The application is healthy.' }));
            } else if (req.url === '/readiness') {
                const members = await redis.smembers(this.clusterKey);
                if (!this.isReady || !members.includes(this.currentPodIp)) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'unavailable', message: 'Pod is not ready or missing from cluster.' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'ready', message: 'Pod is ready to serve traffic.' }));
                }
            } else {
                const members = await redis.smembers(this.clusterKey);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Hello from node at ${this.currentPodIp}\nCluster Members: ${members.join(', ')}`);
            }
        });

        server.listen(port, () => {
            console.log(`Server listening on ${this.currentPodIp}:${port}`);
        });
    }
}

// Helper function for DNS resolution
function resolveClusterNodes() {
    return new Promise((resolve, reject) => {
        dns.lookup(serviceName, { all: true }, (err, addresses) => {
            if (err) {
                reject(err);
            } else {
                resolve(addresses.map(entry => entry.address));
            }
        });
    });
}

// Start the cluster
const clusterManager = new ClusterManager();
clusterManager.startCluster();
