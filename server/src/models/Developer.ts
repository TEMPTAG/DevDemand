import mongoose, { Schema, Document, Model, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the Developer interface
export interface IDeveloper extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(password: string): Promise<boolean>;
}

// Create the Developer schema
const developerSchema: Schema<IDeveloper> = new Schema<IDeveloper>({
  name: {
    type: String,
    required: [true, 'Name is required'], // Validation for name
    trim: true, // Remove leading/trailing whitespace
    minlength: [2, 'Name must be at least 2 characters'], // Minimum length
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Validation for email
    unique: true,
    lowercase: true, // Store email in lowercase
    trim: true, // Remove leading/trailing whitespace
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email format validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Validation for password
    minlength: [6, 'Password must be at least 6 characters'], // Minimum password length
  },
});

// Hash the password before saving it to the database
developerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next(); // Hash only if password is modified

  try {
    // Hash the password with 10 rounds of salt
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error: unknown) {
    next(error as CallbackError); // Pass error to the next middleware
  }
});

// Method to compare passwords (to use in the login resolver)
developerSchema.methods.matchPassword = async function (this: IDeveloper, password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password); // Compare the given password with the hashed password
};

// Create the Developer model
const Developer: Model<IDeveloper> = mongoose.model<IDeveloper>('Developer', developerSchema);

export default Developer;