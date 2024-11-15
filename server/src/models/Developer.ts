import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing and comparing passwords

// Define the Developer interface
interface Developer extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
}

// Create the Developer schema
const developerSchema: Schema = new Schema<Developer>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensure email is stored in lowercase
    trim: true, // Remove any leading/trailing whitespace
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email regex validation
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
developerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next(); // Only hash if the password is modified and exists

  // Hash the password with 10 rounds of salt
  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

// Method to compare passwords (to use in the login resolver)
developerSchema.methods.matchPassword = async function (this: Developer, password: string) {
  return bcrypt.compare(password, this.password); // Compare the given password with the stored hashed password
};

// Create the Developer model
const Developer = mongoose.model<Developer>('Developer', developerSchema);

export default Developer;