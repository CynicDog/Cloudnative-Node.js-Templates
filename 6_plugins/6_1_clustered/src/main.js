const http = require('http');
const dns = require('dns');

const podIP = process.env.CURRENT_POD_IP;
const port = process.env.HTTP_PORT || 8080;
const serviceName = process.env.SERVICE_NAME || 'node-app.default.svc.cluster.local';

// Function to resolve pod IP addresses using DNS
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

// Simulated Node.js Cluster Manager Logic
class ClusterManager {
    constructor() {
        this.members = [];
        this.currentPodIp = podIP;
        this.isReady = false; // Track readiness state
    }

    async discoverClusterMembers() {
        try {
            const nodes = await resolveClusterNodes();
            nodes.forEach(node => {
                if (!this.members.includes(node)) {
                    this.members.push(node);
                    console.log(`Discovered node IP: ${node}`);
                }
            });
        } catch (err) {
            console.error('Failed to resolve cluster members:', err);
        }
    }

    async startCluster() {
        // Start listening for requests
        this.listenForRequests();

        // Add the current node to the members list
        this.members.push(this.currentPodIp);

        console.log(`Cluster initialized with node ${this.currentPodIp}`);

        // Periodically discover cluster members
        setInterval(() => {
            this.discoverClusterMembers();
        }, 3000);

        // Mark the pod as ready
        this.isReady = true;
    }

    listenForRequests() {
        const server = http.createServer((req, res) => {
            if (req.url === '/health') {
                // Health check endpoint
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(
                    JSON.stringify({
                        status: 'ok',
                        message: 'The application is healthy.',
                    })
                );
            } else if (req.url === '/readiness') {
                // Readiness check endpoint
                dns.lookup(serviceName, (err) => {
                    if (err || !this.isReady) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(
                            JSON.stringify({
                                status: 'unavailable',
                                message: 'Pod is not ready due to DNS lookup failure or cluster initialization not complete.',
                            })
                        );
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(
                            JSON.stringify({
                                status: 'ready',
                                message: 'Pod is ready to serve traffic.',
                            })
                        );
                    }
                });
            } else {
                // Default request handler
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Hello from node at ${this.currentPodIp}\nCluster Members: ${this.members.join(', ')}`);
            }
        });

        server.listen(port, () => {
            console.log(`Server listening on ${this.currentPodIp}:${port}`);
        });
    }
}

// Instantiate and start the cluster manager
const clusterManager = new ClusterManager();
clusterManager.startCluster();
