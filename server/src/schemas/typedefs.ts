const typeDefs = `

type Query {
    test: String
}

type Mutation {
    test2(input: String): String
}

`;

export default typeDefs;
