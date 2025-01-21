// Define the type for the book object
export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}

// Create the books array with the type applied
const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    description: "A novel set in the Jazz Age.",
    image: "image-link",
    link: "book-link",
  },
  {
    id: "2",
    title: "1984",
    authors: ["George Orwell"],
    description: "Dystopian novel.",
    image: "image-link",
    link: "book-link",
  },
];

export default books;  // Use default export for TypeScript
