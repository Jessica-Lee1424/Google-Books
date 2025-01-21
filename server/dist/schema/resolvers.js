import books from '../models/Book'; // Correctly import books as default export
const resolvers = {
    Query: {
        books: () => books, // Return type of books is an array of Book objects
        book: (parent, args) => {
            return books.find(book => book.id === args.id); // Return type is Book or undefined
        },
    },
    Mutation: {
        addBook: (parent, args) => {
            const newBook = {
                id: `${Date.now()}`, // Use a timestamp for a unique ID
                authors: [],
                description: '',
                image: '',
                link: '',
                ...args, // Destructure args to get title, author, etc., but no id
            };
            books.push(newBook);
            return newBook;
        },
        deleteBook: (parent, args) => {
            const index = books.findIndex(book => book.id === args.id);
            if (index === -1)
                throw new Error("Book not found");
            const [deletedBook] = books.splice(index, 1);
            return deletedBook; // Return type is Book
        },
    },
};
export default resolvers;
