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
  };
}

interface DeleteDeveloperArgs {
  id: string;
}

const resolvers = {
  Query: {
    // Resolver for the "me" query, which returns the authenticated Developer's data
    me: async (_parent: any, _args: any, context: any) => {
      if (context.developer) {
        return Developer.findOne({ _id: context.developer._id });
      }
      throw new AuthenticationError("You must be logged in.");
    },

    developers: async () => {
      return await Developer.find({});
    },
  },

  Mutation: {
    // Resolver for logging in a Developer
    login: async (_parent: any, { email, password }: LoginDeveloperArgs) => {
      const developer = await Developer.findOne({ email });
      if (!developer) {
        throw new AuthenticationError("Invalid email.");
      }
      const correctPw = await developer.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid password.");
      }
      const token = signToken(developer.email, developer._id);
      return { token, developer };
    },

    // Resolver for adding a new Developer (sign up)
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

    // Update developer profile
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

    // Delete a developer account
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

      if (context.developer._id !== id) {
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

// Export the resolvers object for use in GraphQL schema
export default resolvers;
