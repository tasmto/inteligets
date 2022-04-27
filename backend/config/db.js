import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error" ${error.message}`.red.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
