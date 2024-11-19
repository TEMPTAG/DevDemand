import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

// Define types for the JWT payload
interface JwtPayload {
  email: string;
}

export const authenticateToken = (req: any, _res: any, next: any) => {
  // Ensure req and its properties are defined
  if (!req || !req.headers) {
    return next(new AuthenticationError('Invalid request object.'));
  }

  const body = req.body || {};
  const query = req.query || {};
  const headers = req.headers || {};

  // Extract token from headers or body/query
  let token = body.token || query.token || headers.authorization;

  // If the token is in the authorization header, split to get the actual token
  if (typeof headers.authorization === 'string') {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, throw an authentication error
  if (!token) {
    return next(new AuthenticationError('No token provided.'));
  }

  // Try to verify the token and add user data to the request if valid
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    req.user = data as JwtPayload; // Attach user data to the request
    next();
  } catch (err) {
    next(new AuthenticationError('Invalid or expired token.'));
  }
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