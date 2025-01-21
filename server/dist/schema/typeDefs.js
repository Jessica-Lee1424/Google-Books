import { gql } from 'graphql-tag';
// Define the GraphQL schema using gql
const typeDefs = gql `
  type Book {
    id: ID!
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
  }

  input AddBookInput {
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(input: AddBookInput!): Book
    deleteBook(id: ID!): Book
  }
`;
export default typeDefs;
