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
      const developer = await Developer.findOne({ email }); // Assuming Mongoose usage

      // Debugging logs
      console.log("Developer found:", developer);

      if (!developer) {
        throw new AuthenticationError('Developer not found');
      }

      // Compare the provided password with the stored (hashed) password
      const isMatch = await bcrypt.compare(password, developer.password);

      // Debugging logs
      console.log("Password match:", isMatch);

      if (!isMatch) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign(
        { developerId: developer._id },
        process.env.JWT_SECRET_KEY || 'secret',
        { expiresIn: '1h' }
      );

      // Debugging logs
      console.log("Generated token:", token);

      // Return the token and developer's details
      return {
        token,
        developer: {
          _id: developer._id, // Include _id as required in schema
          name: developer.name, // Assuming name exists in the Developer model
          email: developer.email,
        },
      };
    },
  },
};

export default resolvers;