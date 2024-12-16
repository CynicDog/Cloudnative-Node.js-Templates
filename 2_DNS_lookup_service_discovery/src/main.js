const http = require('http');
const dns = require('dns');

// Define fully qualified domain name (FQDN) for DNS query
const serviceName = 'node-app.default.svc.cluster.local';

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        // Health check endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            message: 'The application is healthy.',
        }));
    } else if (req.url === '/readiness') {
        // Readiness check endpoint
        dns.lookup(serviceName, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'unavailable',
                    message: 'Pod is not ready due to DNS lookup failure.',
                }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'ready',
                    message: 'Pod is ready to serve traffic.',
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
                discoveredPodIP: address,
            }));
        });
    }
});

// Start the server
server.listen(8080, () => {

    // Resolve the DNS and discover the IP (for external use, not necessary for local requests)
    dns.lookup(serviceName, (err, address, family) => {
        if (err) {
            console.error('DNS lookup failed', err);
            return;
        }
        console.log(`Discovered Pod IP: ${address}. Discovery Successful.`);
    });
});
