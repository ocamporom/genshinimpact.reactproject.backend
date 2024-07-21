import mongoose from 'mongoose';
import process from 'node:process'

async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  // Change the `ecommerce-app` on your desired database name
}

export default connectDb;