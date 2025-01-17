"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Book_1 = __importDefault(require("./models/Book"));
exports.resolvers = {
    Query: {
        books: async () => {
            return await Book_1.default.find({});
        },
    },
    Mutation: {
        addBook: async (_, { title, author }) => {
            const newBook = new Book_1.default({ title, author });
            await newBook.save();
            return newBook;
        },
    },
};
