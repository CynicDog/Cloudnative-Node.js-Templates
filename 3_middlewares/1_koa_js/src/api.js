const Router = require('koa-router');
const router = new Router();

// Simulate an in-memory store with async behavior
let items = [];

/**
 * Create a new item
 * @example http POST :3000/items name="Item1" description="This is Item1"
 */
router.post('/items', async (ctx) => {
    const { name, description } = ctx.request.body;
    if (!name || !description) {
        ctx.status = 400;
        ctx.body = { message: 'Name and description are required.' };
        return;
    }

    // Simulate async operation
    const newItem = await new Promise((resolve) => {
        const item = { id: items.length + 1, name, description };
        setTimeout(() => resolve(item), 100);
    });

    items.push(newItem);
    ctx.status = 201;
    ctx.body = newItem;
});

/**
 * Read all items
 * @example http :3000/items
 */
router.get('/items', async (ctx) => {
    ctx.body = await new Promise((resolve) => {
        // Simulate async data retrieval
        setTimeout(() => resolve(items), 100);
    });
});

/**
 * Read a single item by ID
 * @example http :3000/items/1
 */
router.get('/items/:id', async (ctx) => {
    const { id } = ctx.params;
    const item = await new Promise((resolve) => {
        setTimeout(() => resolve(items.find(i => i.id === parseInt(id))), 100);
    });

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
router.put('/items/:id', async (ctx) => {
    const { id } = ctx.params;
    const { name, description } = ctx.request.body;

    const item = await new Promise((resolve) => {
        setTimeout(() => resolve(items.find(i => i.id === parseInt(id))), 100);
    });

    if (!item) {
        ctx.status = 404;
        ctx.body = { message: 'Item not found.' };
        return;
    }

    // Update the item asynchronously
    await new Promise((resolve) => {
        setTimeout(() => {
            item.name = name || item.name;
            item.description = description || item.description;
            resolve();
        }, 100);
    });

    ctx.body = item;
});

/**
 * Delete an item by ID
 * @example http DELETE :3000/items/1
 */
router.delete('/items/:id', async (ctx) => {
    const { id } = ctx.params;
    const index = await new Promise((resolve) => {
        setTimeout(() => resolve(items.findIndex(i => i.id === parseInt(id))), 100);
    });

    if (index === -1) {
        ctx.status = 404;
        ctx.body = { message: 'Item not found.' };
        return;
    }

    // Remove the item asynchronously
    await new Promise((resolve) => {
        setTimeout(() => {
            items.splice(index, 1);
            resolve();
        }, 100);
    });

    ctx.status = 204; // No content
});

module.exports = router;
