const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./api');

const app = new Koa();
app.use(bodyParser());

// Use the routes from api.js
app
    .use(router.routes())
    .use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`Application is listening to port:${port}`);
});
