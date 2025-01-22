import { gql } from 'graphql-tag';

// Define the GraphQL schema using gql
const typeDefs = gql`
  type Book {
    bookId: ID!
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  input AddBookInput {
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addBook(input: AddBookInput!): User
    deleteBook(bookId: ID!): User
    addUser(userName: String!, email: String!, password: String!):Auth
    login(userName: String!, password: String!):Auth
  }
  
`;

export default typeDefs;