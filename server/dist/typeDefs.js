import { gql } from 'graphql-tag';
export const typeDefs = gql `
  type Book {
    _id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;
