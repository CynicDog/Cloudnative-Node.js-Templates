'use strict'

// In-memory storage for items
let items = [];

module.exports = async function (fastify, opts) {

  /**
   * Create a new item
   * @example http POST :3000/items name="Item1" description="This is Item1"
   */
  fastify.post('/items', async (request, reply) => {
    const { name, description } = request.body;
    const id = items.length + 1; // Simple ID generation
    const newItem = { id, name, description };
    items.push(newItem);
    reply.code(201).send(newItem); // Return the created item with status code 201
  });

  /**
   * Read all items
   * @example http :3000/items
   */
  fastify.get('/items', async (request, reply) => {
    return items; // Return all items
  });

  /**
   * Read a single item by ID
   * @example http :3000/items/1
   */
  fastify.get('/items/:id', async (request, reply) => {
    const { id } = request.params;
    const item = items.find(i => i.id === parseInt(id));

    if (!item) {
      return reply.code(404).send({ message: "Item not found" }); // 404 if item is not found
    }

    return item;
  });

  /**
   * Update an existing item by ID
   * @example http PUT :3000/items/1 name="Item1 - Updated"
   */
  fastify.put('/items/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, description } = request.body;

    let item = items.find(i => i.id === parseInt(id));

    if (!item) {
      return reply.code(404).send({ message: "Item not found" }); // 404 if item is not found
    }

    // Update the item
    item = { ...item, name, description };
    items = items.map(i => (i.id === parseInt(id) ? item : i));

    return item;
  });

  /**
   * Delete an item by ID
   * @example http DELETE :3000/items/1
   */
  fastify.delete('/items/:id', async (request, reply) => {
    const { id } = request.params;

    const itemIndex = items.findIndex(i => i.id === parseInt(id));
    if (itemIndex === -1) {
      return reply.code(404).send({ message: "Item not found" }); // 404 if item is not found
    }

    items.splice(itemIndex, 1); // Remove the item from the array
    return { message: "Item deleted successfully" }; // Return success message
  });

};
