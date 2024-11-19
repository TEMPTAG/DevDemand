import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || '';

// Log the MongoDB URI to verify it's being loaded correctly (for debugging)
console.log('MongoDB URI:', MONGODB_URI);

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined. Please check your .env file.');
    }

    // Establish connection to MongoDB using mongoose
    await mongoose.connect(MONGODB_URI, {
    });

    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;