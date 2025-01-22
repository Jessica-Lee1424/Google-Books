import User from '../models/User.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user_id });
                return userData;
            }
            return 'meFailed';
        }
    },
    Mutation: {
        addBook: async (_parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: args } }, { new: true, runValidators: true });
                return updatedUser;
            }
            ;
            return 'savedBookFailed';
        },
        deleteBook: async (_parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId: args.bookId } } }, { new: true });
                return updatedUser;
            }
            ;
            return 'deleteBookFailed';
        }
    }
};
export default resolvers;
