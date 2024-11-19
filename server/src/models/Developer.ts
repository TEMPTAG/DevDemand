// Import Mongoose for schema/model creation and types
import { Schema, model, type Document } from "mongoose";
// Import bcrypt for hashing and comparing passwords
import bcrypt from "bcrypt";

// Define the Developer interface
export interface DeveloperDocument extends Document {
  id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  city: string;
  state: string;
  portfolioLink?: string;
  githubLink?: string;
  hourlyRate: number;
  bio: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Create the Developer schema
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
  imageUrl: String,
  firstName: String,
  lastName: String,
  telephone: String,
  city: String,
  state: String,
  portfolioLink: String,
  githubLink: String,
  hourlyRate: Number,
  bio: String,
});

// Middleware to hash the Developer's password before saving it to the database
developerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Method to compare the entered password with the stored hashed password
developerSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Create the Developer model based on the developerSchema and export it
const Developer = model<DeveloperDocument>("Developer", developerSchema);

export default Developer;
