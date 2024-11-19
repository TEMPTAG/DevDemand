import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

// Define types for the JWT payload
interface JwtPayload {
  email: string;
}

export const authenticateToken = ({ req }: any) => {
  // Extract token from headers or body/query
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is in the authorization header, split to get the actual token
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, throw an authentication error
  if (!token) {
    throw new AuthenticationError('No token provided.');
  }

  // Try to verify the token and add user data to the request if valid
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    req.user = data as JwtPayload; // Attach user data to the request
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token.');
  }

  return req;
};

export const signToken = (email: string) => {
  // Only store non-sensitive user info in the token payload
  const payload = { email };

  // Generate and return a signed JWT with an expiration time
  return jwt.sign({ data: payload }, process.env.JWT_SECRET_KEY || '', { expiresIn: '2h' });
};

// Custom AuthenticationError class for GraphQL errors
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, { extensions: { code: 'UNAUTHENTICATED' } });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};