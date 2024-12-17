# DNS Lookup Service Discovery on Kubernetes

### Run the Application on the Local Machine
```bash
$ 2_DNS_lookup_service_discovery> node src/main.js 
```

### Run the Application on Kind (Kubernetes in Docker)
```bash
$ 2_DNS_lookup_service_discovery> kind create cluster --name=node-dns 
$ 2_DNS_lookup_service_discovery> docker exec -it node-dns-control-plane /bin/bash 
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
$ 2_DNS_lookup_service_discovery> kubectl port-forward service/node-app 8080:8080
$ 2_DNS_lookup_service_discovery> http :8080/ 
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
