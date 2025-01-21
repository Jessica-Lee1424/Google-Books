import express from 'express';
import {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} from '../../controllers/user-controller'; // Adjusted for TypeScript import syntax
import { authenticateToken } from '../../services/auth'; // Adjusted for TypeScript import syntax

const router = express.Router();

// Define routes
router.route('/').post(createUser).put(authenticateToken, saveBook);
router.route('/login').post(login);
router.route('/me').get(authenticateToken, getSingleUser);
router.route('/books/:bookId').delete(authenticateToken, deleteBook);

export default router;