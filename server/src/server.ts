import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
// import { dot } from 'node:test/reporters';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file

// Initialize file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection (for testing via GraphQL Playground/GraphiQL)
  plugins: [
    {
      async serverWillStart() {
        console.log("Apollo Server is starting...");
      },
    },
  ],
});

// JWT Authentication Middleware
const authenticateToken = async (req: any) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    throw new Error('Authentication token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!); // Decode the JWT token
    return decoded; // Return decoded user data (i.e., developer)
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
    console.log('Connected to:', process.env.MONGODB_URI);
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit on connection error
  }
};

// Start Apollo Server and Express Application
const startApolloServer = async () => {
  await server.start(); // Start ApolloServer
  await connectDB(); // Connect to MongoDB

  const app = express();

  // Middleware setup
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo server middleware to handle GraphQL requests
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Skip authentication for the login mutation
        if (req.body.operationName === 'login') {
          return { user: null }; // No user context for login
        }

        // For all other queries, authenticate token
        const user = await authenticateToken(req);
        return { user }; // Add user to context (available in resolvers)
      },
    })
  );

  // Serve static files in production (e.g., React build)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

// Start the server
startApolloServer();