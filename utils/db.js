import mongoose from 'mongoose';
import {mongodbHost} from "@/Enviroments"
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
};

export default connectDB;
