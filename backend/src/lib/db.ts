import mongoose from 'mongoose';


export async function connectDB() {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI);
    // The minimum needed to connect to a local MongoDB instance
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('🔥 MongoDB connection error:', err);
    process.exit(1);
  }
  // Optional: listen for later disconnects/reconnects
  mongoose.connection.on('error', err => console.error('MongoDB error', err));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
}