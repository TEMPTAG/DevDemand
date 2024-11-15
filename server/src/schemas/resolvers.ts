const resolvers = {
  Query: {
    test: () => "Test message!",
  },
  Mutation: {
    test2: async (_parent: any, { input }: any) => {
      return `Test message: ${input}`;
    },
  },
};

export default resolvers;
