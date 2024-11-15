import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

// Check for required environment variables
if (!process.env.JWT_SECRET_KEY || !process.env.MONGODB_URI) {
  console.error('Missing environment variables. Please check your .env file.');
  process.exit(1);
}

// Initialize file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection for testing via GraphQL Playground/GraphiQL
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

  // CORS setup to allow frontend (localhost:3000) to make requests to this backend (localhost:3001)
  app.use(cors({
    origin: 'http://localhost:3000', // Allow only frontend from this origin
    methods: 'GET,POST', // Allow these HTTP methods
    credentials: true, // Allow credentials if needed (cookies, authorization headers)
  }));

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

        try {
          // For all other queries, authenticate token
          const user = await authenticateToken(req);
          return { user }; // Add user to context (available in resolvers)
        } catch (err) {
          console.error("Error during token authentication:", err);
          return { user: null }; // If token is invalid, pass null user context
        }
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