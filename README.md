# Cloudnative Node.js Templates 

### Index 
1. [A. Nodes in Cluster](#a-nodes-in-cluster)
2. [B. DNS Lookup Service Discovery on Kubernetes](#b-dns-lookup-service-discovery-on-kubernetes)
3. [C. Middlewares](#c-middlewares)
4. [D. Authentication](#d-authentication)

<details><summary><h3>A. Nodes in Cluster</h3></summary>

## Nodes in Cluster 

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

👆 [back to index](#index)

</details>


<details><summary><h3>B. DNS Lookup Service Discovery on Kubernetes</h3></summary>

## DNS Lookup Service Discovery on Kubernetes

### Run the Application on the Local Machine
```bash
$ 2_DNS_lookup_service_discovery_on_k8s> node src/main.js 
```

### Run the Application on Kind (Kubernetes in Docker)
```bash
$ 2_DNS_lookup_service_discovery_on_k8s> kind create cluster --name=node-dns 
$ 2_DNS_lookup_service_discovery_on_k8s> docker exec -it node-dns-control-plane /bin/bash 
$ root@node-dns-control-plane:/# kubectl create -f k8s/ 
```
> Ensure Kubernetes resource files are located in the `k8s` directory within the container, matching the repository's `k8s` directory.

If deployed successfully, the list of exposed endpoints by the headless service should look like this:
```bash
root@node-dns-control-plane:/# kubectl get endpoints
NAME         ENDPOINTS                                            AGE
kubernetes   172.18.0.4:6443                                      85m
node-app     10.244.0.17:8080,10.244.0.18:8080,10.244.0.19:8080   8m28s
```

### Test the Server Functionality
```bash
$ 2_DNS_lookup_service_discovery_on_k8s> kubectl port-forward service/node-app 8080:8080
$ 2_DNS_lookup_service_discovery_on_k8s> http :8080/ 
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Mon, 16 Dec 2024 08:04:39 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{
    "discoveredPodIP": "10.244.0.17", 
    "message": "Hello World."
}
```
> Run these commands in separate terminal windows.

👆 [back to index](#index)

</details>

<details><summary><h3>C. Middlewares</h3></summary>

## Node.js Middlewares CRUD Implementations

| **Criteria**           | [Express.js](https://github.com/expressjs/express) | [Koa.js](https://github.com/koajs/koa)  | [Nest.js](https://github.com/nestjs/nest)  | [Fastify](https://github.com/fastify/fastify)  |
|------------------------|--------------------------------------|-----------------------------------------------|----------------------------------------------|------------------------------------------------|
| **Ease of Use**         | Very beginner-friendly, minimalistic | Requires more setup, uses modern JavaScript   | Steeper learning curve, structured & modular | Simple, developer-friendly with a learning curve |
| **Architecture**        | Minimal structure, flexible          | Modular, unopinionated                        | Opinionated, modular, TypeScript-focused     | Structured, modular with plugin support        |
| **Extensibility**       | Highly extensible with many plugins  | Flexible, but fewer built-in features         | Highly extensible with built-in tools        | Built-in plugins, highly extensible            |
| **Community**           | Largest community, vast ecosystem    | Smaller community, fewer third-party packages | Growing, especially in TypeScript/enterprise | Rapidly growing, strong support for modern use |
| **Popularity (GitHub Stars)** | 65.9k ⭐⭐⭐⭐                | 35.3k   ⭐⭐⭐                               | 68.4k ⭐⭐⭐⭐⭐                            | 32.6k  ⭐⭐⭐                                 |

### Run the Application on the Local Machine

For **Koa.js**:
```bash
$ 1_koa_js> node src/main.js
```

For **Nest.js**:
```bash
$ 2_nest_js> npm run start
```

For **Express.js**:
```bash
$ 3_express_js> node src/main.js
```

For **Fastify**:
```bash
$ 4_fastify> npm run dev 
```

### Run the Application on Container

For **Koa.js**:
```bash
$ 1_koa_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_koa_js:latest
```

For **Nest.js**:
```bash
$ 2_nest_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_nest_js:latest
```

For **Express.js**:
```bash
$ 3_express_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_express_js:latest
```

For **Fastify**:
```bash
$ 4_fastify> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_fastify:latest
```

### Test the Server Functionality

The server endpoints are the same for all the frameworks:

1. **Create an Item**
   ```bash
   $ > http POST :3000/items name="Item1" description="This is Item1"
   ```

2. **Get All Items**
   ```bash
   $ > http :3000/items
   ```

3. **Update an Item**
   ```bash
   $ > http PUT :3000/items/1 name="Item1 - Updated"
   ```

4. **Delete an Item**
   ```bash
   $ > http DELETE :3000/items/1
   ```

👆 [back to index](#index)

</details>

<details><summary><h3>D. Authentication</h3></summary>

## OAuth2 Flow in `Express.js` \ `Fastify` with GitHub as Identity Provider 

![gh_oauth2](https://github.com/user-attachments/assets/76091129-2911-4e40-bfb2-866b56195ac8)

👆 [back to index](#index)

</details>
