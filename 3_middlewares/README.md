# Node.js Middlewares CRUD Implementations

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
