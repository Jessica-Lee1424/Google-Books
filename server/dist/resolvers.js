import { Book } from './models/Book';
export const resolvers = {
    Query: {
        books: async () => {
            return await Book.find({});
        },
    },
    Mutation: {
        addBook: async (_, { title, author }) => {
            const newBook = new Book({ title, author });
            await newBook.save();
            return newBook;
        },
    },
};
