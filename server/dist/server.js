"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const connection_js_1 = __importDefault(require("./config/connection.js"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Set up Apollo Server
const server = new server_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
await server.start();
// Middleware for Apollo Server
app.use('/graphql', (0, cors_1.default)(), // Enable CORS
(0, express4_1.expressMiddleware)(server, {
    context: async ({ req }) => {
        // Include context setup here (e.g., auth token)
        return { token: req.headers.authorization };
    },
}));
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(node_path_1.default.join(__dirname, '../client/build')));
}
app.use(index_js_1.default);
connection_js_1.default.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}/graphql`));
});
