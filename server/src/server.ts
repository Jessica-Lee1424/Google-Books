import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express'; // Import Express type
import typeDefs from './schema/typeDefs'; // Adjust the path as necessary
import resolvers from './schema/resolvers'; // Adjust the path as necessary
import books from './models/Book'; // Assuming you have a books model

// Set up the Apollo Server with Express
const app: Express = express(); // Explicitly set the type of app
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply middleware to connect Apollo Server with Express
server.applyMiddleware({ app });

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
});