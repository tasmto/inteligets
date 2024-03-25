import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Morgan logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // allows us to use JSON data in the body

app.use('/api/upload', uploadRoutes); // mount the file upload routes
app.use('/api/products', productRoutes); // mount the product routes
app.use('/api/users', userRoutes); // mount the user routes
app.use('/api/orders', orderRoutes); // mount the order routes

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
); // Config and send paypal ID

// The uploads folder by default wont be accessible for node so we need to make it using express
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

// Error middle ware: inter splices itself wen there is an error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process?.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
