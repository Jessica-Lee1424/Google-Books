import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
// Middleware for Apollo Server
app.use('/graphql', cors(), // Enable CORS
expressMiddleware(server, {
    context: async ({ req }) => {
        // Include context setup here (e.g., auth token)
        return { token: req.headers.authorization };
    },
}));
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}
app.use(routes);
db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}/graphql`));
});
