const http = require('http');
const dns = require('dns');

const podIP = process.env.CURRENT_POD_IP;
const port = process.env.HTTP_PORT || 8080;
const serviceName = process.env.SERVICE_NAME || 'node-app.default.svc.cluster.local'

// Function to resolve pod IP addresses using DNS
function resolveClusterNodes() {
    return new Promise((resolve, reject) => {
        dns.lookup(serviceName, { all: true }, (err, addresses) => {
            if (err) {
                reject(err);
            } else {
                resolve(addresses.map(entry => entry.address)); // Extract only the IP addresses
            }
        });
    });
}

// Simulated Node.js Cluster Manager Logic
class ClusterManager {
    constructor() {
        this.members = [];
        this.currentPodIp = podIP;
    }

    async discoverClusterMembers() {
        try {
            const nodes = await resolveClusterNodes();
            nodes.forEach(node => {
                this.members.push(node.target);
                console.log(`Discovered node: ${node.target}`);
            });
        } catch (err) {
            console.error('Failed to resolve cluster members:', err);
        }
    }

    async startCluster() {
        // Discover other nodes in the cluster
        await this.discoverClusterMembers();
        console.log(`Cluster initialized with ${this.members.length} members`);

        // Add the current node to the list
        this.members.push(this.currentPodIp);

        // Listen for incoming requests
        this.listenForRequests();
    }

    listenForRequests() {
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Hello from node at ${this.currentPodIp}\nCluster Members: ${this.members.join(', ')}`);
        });

        server.listen(port, () => {
            console.log(`Server listening on ${this.currentPodIp}:${port}`);
        });
    }
}

// Instantiate and start the cluster manager
const clusterManager = new ClusterManager();
clusterManager.startCluster();
