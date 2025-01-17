import { Book } from './models/Book';

export const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
  },
  Mutation: {
    addBook: async (_: any, { title, author }: { title: string; author: string }) => {
      const newBook = new Book({ title, author });
      await newBook.save();
      return newBook;
    },
  },
};
