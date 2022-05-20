import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // allows us to use JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes); // mount the product routes
app.use('/api/users', userRoutes); // mount the user routes
app.use('/api/orders', orderRoutes); // mount the order routes

// Error middle ware: inter splices itself wen there is an error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process?.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
