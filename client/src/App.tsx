// Import Apollo Client libraries for connecting to the GraphQL server
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
// Import utility for setting headers with authentication tokens
import { setContext } from "@apollo/client/link/context";
// Import Outlet from React Router for nested routes
import { Outlet } from "react-router-dom";
// Import the Header component
import Header from "./components/Header";
// Import the Footer component
import Footer from "./components/Footer";

// Create an HTTP link to connect to the GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql", // The URI of the GraphQL server
});

// Set the authorization headers for every request
const authLink = setContext((_, { headers }) => {
  // Retrieve the JWT token from local storage and set the authorization header
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an Apollo Client instance, combining the auth link and HTTP link
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedBooks: {
            merge(existing = [], incoming = []) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

// The main App component that serves as the layout for the entire application
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
