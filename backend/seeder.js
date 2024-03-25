import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

export const importData = async () => {
  try {
    // Wipe everything before seeding
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Because we need a ref to the user who created a product we have to reference said user first (get mongoose their id) and inset that in each product after the fact
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers.at(0)._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Couldn\'t import data! ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Wipe everything before seeding
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Couldn\'t destroy data! ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Will allow us to run node backend/seeder (runs import)
// Will allow us to run node backend/seeder -d (destroys data)
if (process.argv[2] === '-d') destroyData();
else importData();
