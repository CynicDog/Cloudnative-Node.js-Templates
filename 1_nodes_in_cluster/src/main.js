const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (i = 0; i < numCPUs; i++) {
        // Create workers for each CPU core
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World\n');
    }).listen(8080, () => {
        console.log(`Worker ${process.pid} started and listening on port 8000`);
    })
}