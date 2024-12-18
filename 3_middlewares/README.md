# Node.js Middlewares CRUD Implementations

### Run the Application on the Local Machine

For **Koa.js**:
```bash
$ 1_koa_js> node src/main.js
```

For **NestJS**:
```bash
$ 2_nest_js> npm run start
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
