const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = [];
let currentId = 1;

/**
 * Create a new item
 * @example http POST :3000/items name="Item1" description="This is Item1"
 */
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    const newItem = { id: currentId++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * Read all items
 * @example http :3000/items
 */
app.get('/items', (req, res) => {
    res.json(items);
});

/**
 * Read a single item by ID
 * @example http :3000/items/1
 */
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
});

/**
 * Update an existing item by ID
 * @example http PUT :3000/items/1 name="Item1 - Updated"
 */
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    if (name) item.name = name;
    if (description) item.description = description;
    res.json(item);
});

/**
 * Delete an item by ID
 * @example http DELETE :3000/items/1
 */
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
