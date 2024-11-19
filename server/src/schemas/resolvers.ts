import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Developer from '../models/Developer.js';
import { AuthenticationError } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

const resolvers = {
  Query: {
    currentDeveloper: async (_parent: any, _args: any, context: any) => {
      return context.user || null;
    },
  },

  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      // Find the developer by email
      const developer = await Developer.findOne({ email });

      if (!developer) {
        throw new AuthenticationError('Developer not found');
      }

      // Compare the provided password with the stored (hashed) password
      const isMatch = await bcrypt.compare(password, developer.password);

      if (!isMatch) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign(
        { developerId: developer._id },
        process.env.JWT_SECRET_KEY || 'secret',
        { expiresIn: '1h' }
      );

      // Return the token and developer's details
      return {
        token,
        developer: {
          _id: developer._id,
          email: developer.email,
        },
      };
    },

    createUser: async (_: any, { email, password }: { email: string; password: string }) => {
      // Check if email already exists
      const existingDeveloper = await Developer.findOne({ email });
      if (existingDeveloper) {
        throw new AuthenticationError('Email is already in use');
      }

      // Create a new developer (the password is hashed by the pre('save') middleware in the model)
      const newDeveloper = new Developer({ email, password });
      await newDeveloper.save();

      // Generate a JWT token
      const token = jwt.sign(
        { developerId: newDeveloper._id },
        process.env.JWT_SECRET_KEY || 'secret',
        { expiresIn: '1h' }
      );

      // Return the token and new developer's details
      return {
        token,
        developer: {
          _id: newDeveloper._id,
          email: newDeveloper.email,
        },
      };
    },
  },
};

export default resolvers;