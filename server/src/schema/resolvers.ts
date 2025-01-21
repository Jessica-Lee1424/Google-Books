import { Book } from '../models/Book'; // Import the Book type
import books from '../models/Book'; // Correctly import books as default export

// Define the types for the resolvers
interface Args {
  title: string;  // Exclude id from args since it's generated manually
  author: string;
}

const resolvers = {
  Query: {
    books: (): Book[] => books, // Return type of books is an array of Book objects
    book: (parent: unknown, args: { id: string }): Book | undefined => {
      return books.find(book => book.id === args.id); // Return type is Book or undefined
    },
  },
  Mutation: {
    addBook: (parent: unknown, args: Args): Book => {
      const newBook: Book = {
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
    deleteBook: (parent: unknown, args: { id: string }): Book => {
      const index = books.findIndex(book => book.id === args.id);
      if (index === -1) throw new Error("Book not found");
      const [deletedBook] = books.splice(index, 1);
      return deletedBook; // Return type is Book
    },
  },
};

export default resolvers;
