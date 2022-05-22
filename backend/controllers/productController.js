import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @description: Fetches all products
 * @route        GET /api/products
 * @access       Public
 *@todo errors not propagating through correctly
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products); // both res.send and re.json converts it to JSON
});

/**
 * @description: Fetches a single product
 * @route        GET /api/products/id
 * @access       Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product)
    res.json(product); // both res.send and res.json converts it to JSON
  else {
    res.status(404);
    throw new Error('Product not found');
  }
});
/**
 * @description: DELETES a single product
 * @route        DELETE /api/products/id
 * @access       Private/ Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts, deleteProduct };
