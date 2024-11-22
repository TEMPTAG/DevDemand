import Developer from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

// Define types for the arguments used in mutations
interface LoginDeveloperArgs {
  email: string;
  password: string;
}

interface AddDeveloperArgs {
  email: string;
  password: string;
}

interface UpdateDeveloperArgs {
  input: {
    _id: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    telephone?: string;
    email?: string;
    city?: string;
    state?: string;
    portfolioLink?: string;
    githubLink?: string;
    hourlyRate?: number;
    bio?: string;
  };
}

interface DeleteDeveloperArgs {
  id: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.developer) {
        return Developer.findById(context.developer._id);
      }
      throw new AuthenticationError("You must be logged in.");
    },

    developers: async () => {
      try {
        return await Developer.find({});
      } catch (error) {
        throw new Error("Failed to fetch developers");
      }
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: LoginDeveloperArgs) => {
      const developer = await Developer.findOne({ email });
      if (!developer) {
        throw new AuthenticationError("Invalid email or password.");
      }

      const correctPw = await developer.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password.");
      }

      const token = signToken(developer.email, developer._id);
      return { token, developer };
    },

    addDeveloper: async (
      _parent: any,
      { email, password }: AddDeveloperArgs
    ) => {
      const existingDeveloper = await Developer.findOne({ email });
      if (existingDeveloper) {
        throw new AuthenticationError("Email is already registered.");
      }

      const developer = await Developer.create({ email, password });
      const token = signToken(developer.email, developer._id);
      return { token, developer };
    },

    updateDeveloper: async (
      _parent: any,
      { input }: UpdateDeveloperArgs,
      context: any
    ) => {
      if (!context.developer) {
        throw new AuthenticationError(
          "You must be logged in to update your profile."
        );
      }

      const updatedDeveloper = await Developer.findByIdAndUpdate(
        context.developer._id,
        { ...input },
        { new: true, runValidators: true }
      );

      if (!updatedDeveloper) {
        throw new Error("Developer not found.");
      }

      return updatedDeveloper;
    },

    deleteDeveloper: async (
      _parent: any,
      { id }: DeleteDeveloperArgs,
      context: any
    ) => {
      if (!context.developer) {
        throw new AuthenticationError(
          "You must be logged in to delete your account."
        );
      }

      if (context.developer._id.toString() !== id) {
        throw new AuthenticationError("You can only delete your own account.");
      }

      const deletedDeveloper = await Developer.findByIdAndDelete(id);
      if (!deletedDeveloper) {
        throw new Error("Developer not found.");
      }

      return { message: "Developer account deleted successfully." };
    },
  },
};

export default resolvers;
