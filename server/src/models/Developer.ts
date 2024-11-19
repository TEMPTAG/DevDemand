import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

// Define the DeveloperDocument interface for TypeScript
export interface DeveloperDocument extends Document {
  email: string;
  password: string;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  city?: string;
  state?: string;
  portfolioLink?: string;
  githubLink?: string;
  hourlyRate?: number;
  bio?: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the Developer schema
const developerSchema = new Schema<DeveloperDocument>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  imageUrl: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  telephone: {
    type: String,
    default: null,
    match: [/^\d{3}-\d{3}-\d{4}$/, "Please enter a valid telephone number"],
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  portfolioLink: {
    type: String,
    default: null,
  },
  githubLink: {
    type: String,
    default: null,
  },
  hourlyRate: {
    type: Number,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
});

// Middleware to hash the Developer's password before saving
developerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare entered password with stored hashed password
developerSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create the Developer model
const Developer = model<DeveloperDocument>("Developer", developerSchema);

export default Developer;
