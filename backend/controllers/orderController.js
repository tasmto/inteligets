import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @description: Create new order
 * @route        POST /api/orders
 * @access       Private
 */

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order items');
    return;
  }

  const order = new Order({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });
  const createdOrder = await order.save();

  res.status(201).json({ createdOrder });
});

/**
 * @description: GET order by ID
 * @route        GET /api/orders/id
 * @access       Private
 */

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  ); // populate attaches a name and email for the order

  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});
/**
 * @description: Update order to paid
 * @route        PUT /api/orders/id/pay
 * @access       Private
 */

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @description: Update order to delivered
 * @route        PUT /api/orders/id/deliver
 * @access       Private/Admin
 */

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @description: Get logged in user orders
 * @route        GET /api/orders/myorders
 * @access       Private
 */

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders && orders.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No orders yet');
  }
});
/**
 * @description: Get all orders
 * @route        GET /api/orders/
 * @access       Private/Admin
 */

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');

  if (orders && orders.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No orders yet');
  }
});

/**
 * @description: Get specific user's orders
 * @route        GET /api/orders/user/:userId
 * @access       Private/Admin
 */
const getUserOrdersList = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });

  if (orders && orders.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  getUserOrdersList,
  updateOrderToDelivered,
};
