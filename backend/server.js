const express = require('express'); // Common JS
const products = require('./data/products');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products); // both res.send and re.json converts it to JSON
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product); // both res.send and res.json converts it to JSON
});

app.listen(5000, console.log('Server running on port 5000'));
