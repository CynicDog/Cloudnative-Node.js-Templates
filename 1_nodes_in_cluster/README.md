# Nodes in Cluster 

### Run the Application on the Local Machine  
```bash
$ 1_nodes_in_cluster> node src/main.js 
```

### Run the Application on Container 
```bash
$ 1_nodes_in_cluster> docker run -d -p 8080:8080 ghcr.io/cynicdog/cloudnative-node.js-templates/node-cluster-app:latest
```

### Test the Server Functionality 
```bash
$ 1_nodes_in_cluster> http :8080/
HTTP/1.1 200 OK
Connection: keep-alive
Date: Mon, 16 Dec 2024 05:34:56 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Hello World
```