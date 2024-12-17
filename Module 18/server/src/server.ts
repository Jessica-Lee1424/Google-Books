import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';

// Define your User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const UserModel = mongoose.model('User', userSchema);

// Example function to fetch user by ID
async function fetchUserById(id: string) {
    try {
        const user = await UserModel.findById(id);
        return user || null; // Return null if user not found
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Could not fetch user');
    }
}

// Define your GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }
`;

// Define your resolvers
const resolvers = {
    Query: {
        users: async () => {
            // Fetch users from your database (implement this)
            return await UserModel.find(); // Example implementation
        },
        user: async (_: any, { id }: { id: string }) => {
            return await fetchUserById(id); // Use the fetch function
        },
    },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apply Apollo Server middleware
server.applyMiddleware({ app });

// Use your existing routes
app.use(routes);

// Start the database and server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
    });
});