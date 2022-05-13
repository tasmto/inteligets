import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
const router = express.Router();

/**
 * @description: Fetches all products
 * @route        GET /api/products
 * @access       Public
 */
router.get(
  '/',
  /**@todo errors not propagating through correctly */
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products); // both res.send and re.json converts it to JSON
  })
);

/**
 * @description: Fetches a single product
 * @route        GET /api/products/id
 * @access       Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product)
      res.json(product); // both res.send and res.json converts it to JSON
    else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
