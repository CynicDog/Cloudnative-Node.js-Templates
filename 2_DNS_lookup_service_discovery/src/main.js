const http = require('http');
const dns = require('dns');
const axios = require('axios');

// Get the Pod name from the environment variable
const podName = process.env.POD_NAME || 'unknown-pod';

// Define fully qualified domain name (FQDN) for DNS query
const serviceName = 'node-app.default.svc.cluster.local';

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        // Health check endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            podName: podName,
            message: 'The application is healthy.',
        }));
    } else if (req.url === '/readiness') {
        // Readiness check endpoint
        dns.lookup(serviceName, (err, address) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'unavailable',
                    message: 'Service is not ready due to DNS lookup failure.',
                }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'ready',
                    podName: podName,
                    message: 'Service is ready to serve traffic.',
                    serviceAddress: address,
                }));
            }
        });
    } else {
        // Default route (root)
        dns.lookup(serviceName, (err, address) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to resolve service address.' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Hello World.',
                podName: podName,
                serviceAddress: address,
            }));
        });
    }
});

// Start the server
server.listen(8080, () => {
    console.log(`Server running at http://localhost:8080/`);

    // Resolve the DNS and discover the IP (for external use, not necessary for local requests)
    dns.lookup(serviceName, (err, address, family) => {
        if (err) {
            console.error('DNS lookup failed', err);
            return;
        }

        console.log(`Discovered service: ${address}.\n Current node: ${podName}`);

        // Make a request to the service's root endpoint for demonstration
        axios.get(`http://${address}:8080/`)
            .then(response => {
                console.log('Response from POD:', podName);
            })
            .catch(err => {
                console.error('Error while making HTTP request:', err);
            });
    });
});
