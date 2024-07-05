import mongoose from 'mongoose';

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/genshinimpact-app');
  // Change the `ecommerce-app` on your desired database name
}

export default connectDb;