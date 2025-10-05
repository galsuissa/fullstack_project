const express = require('express');
const mongojs = require('mongojs');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(express.static('static')); // Serve static files from the 'static' directory
app.use(cors()); // Enable CORS

// Connect to the MongoDB database using mongojs
const db = mongojs(
  'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024',
  ['products','orders']
);

// Collections from the database
const products = db.collection('final_guy_gal_products');
const orders = db.collection('final_guy_gal_orders');

// GET endpoint to retrieve all products
app.get('/products', async (req, res) => {
  try {
    products.find((err, docs) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving products' });
      }
      res.status(200).json(docs);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to create a new order
app.post('/orders', (req, res) => {
  // Validate the request body
  if (!(req.body.name && req.body.name.trim().length > 0)) {
    res.status(400).json({ error: 'Must provide customer name' });
    return;
  }

  if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
    res.status(400).json({ error: 'Must provide items in the order' });
    return;
  }

  // Create a new order object
  const newOrder = {
    orderNumber: mongojs.ObjectId().toString().slice(-4), // Generate a unique order number using the last 4 characters of a MongoDB ObjectId
    items: req.body.items,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    shipping: req.body.shipping,
    totalAmount: req.body.totalAmount,
    created_at: new Date(),
    modified_at: new Date()
  };

  // Insert the new order into the 'orders' collection
  orders.insert(newOrder, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json(doc);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
