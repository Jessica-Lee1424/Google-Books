import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { bookSchema, type BookDocument } from './Book.js';

export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  savedBooks: [bookSchema],
});

// Virtual for book count
userSchema.virtual('bookCount').get(function (this: UserDocument) {
  return this.savedBooks.length;
});

// Method to check password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Pre-save hook to hash the password
userSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model<UserDocument>('User', userSchema);

export default User;