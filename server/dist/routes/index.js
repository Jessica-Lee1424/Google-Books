"use strict";
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use(cors());
    app.use(json());
    app.use('/graphql', expressMiddleware(server));
    app.listen(4000, () => {
        console.log('🚀 Server ready at http://localhost:4000/graphql');
    });
};
startServer();
