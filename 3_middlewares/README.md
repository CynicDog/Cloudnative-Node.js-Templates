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

For **NestJS**:
```bash
$ 2_nest_js> docker run -p 3000:3000 ghcr.io/cynicdog/cloudnative-node.js-templates/middleware_nest_js:latest
```

### Test the Server Functionality

For both **Koa.js** and **NestJS**, the server endpoints are the same:

1. **Create an Item**
   ```bash
   $ 1_koa_js> http POST :3000/items name="Item1" description="This is Item1"
   ```

2. **Get All Items**
   ```bash
   $ 1_koa_js> http :3000/items
   ```

3. **Update an Item**
   ```bash
   $ 1_koa_js> http PUT :3000/items/1 name="Item1 - Updated"
   ```

4. **Delete an Item**
   ```bash
   $ 1_koa_js> http DELETE :3000/items/1
   ```
