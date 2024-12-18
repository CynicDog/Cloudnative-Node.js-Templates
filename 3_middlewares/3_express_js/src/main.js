const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = [];
let currentId = 1;

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    const newItem = { id: currentId++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    res.json(item);
});

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
