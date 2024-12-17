const Router = require('koa-router');
const router = new Router();

// In-memory store for items
let items = [];

/**
 * Create a new item
 * @example http POST :3000/items name="Item1" description="This is Item1"
 */
router.post('/items', (ctx) => {
    const { name, description } = ctx.request.body;
    if (!name || !description) {
        ctx.status = 400;
        ctx.body = { message: 'Name and description are required.' };
        return;
    }
    const newItem = { id: items.length + 1, name, description };
    items.push(newItem);
    ctx.status = 201;
    ctx.body = newItem;
});

/**
 * Read all items
 * @example http :3000/items
 */
router.get('/items', (ctx) => {
    ctx.body = items;
});

/**
 * Read a single item by ID
 * @example http :3000/items/1
 */
router.get('/items/:id', (ctx) => {
    const { id } = ctx.params;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        ctx.status = 404;
        ctx.body = { message: 'Item not found.' };
        return;
    }
    ctx.body = item;
});

/**
 * Update an existing item by ID
 * @example http PUT :3000/items/1 name="Item1 - Updated"
 */
router.put('/items/:id', (ctx) => {
    const { id } = ctx.params;
    const { name, description } = ctx.request.body;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        ctx.status = 404;
        ctx.body = { message: 'Item not found.' };
        return;
    }
    // Update the item
    item.name = name || item.name;
    item.description = description || item.description;
    ctx.body = item;
});

/**
 * Delete an item by ID
 * @example http DELETE :3000/items/1
 */
router.delete('/items/:id', (ctx) => {
    const { id } = ctx.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        ctx.status = 404;
        ctx.body = { message: 'Item not found.' };
        return;
    }
    // Remove the item
    items.splice(index, 1);
    ctx.status = 204; // No content
});

module.exports = router;