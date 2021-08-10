const { UserInputError, AuthenticationError } = require("apollo-server");

const checkAuth = require("../../utils/authentication");
const Word = require("../../models/Word");

module.exports = {
    Mutation: {
        createComment: async (parent, { wordId, body }, context) => {
            const user = checkAuth(context);

            if (!user) {
                throw new AuthenticationError("Action not allowed");
            }

            if (body.trim() === "") {
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not empty",
                    },
                });
            }

            const existWord = await Word.findById(wordId);

            if (!existWord) {
                throw new UserInputError("Word not found");
            }

            existWord.comments.unshift({
                body,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            await existWord.save();
            return existWord;
        },

        deleteComment: async (parent, { wordId, commentId }, context) => {
            const user = checkAuth(context);

            if (!user) {
                throw new AuthenticationError("Action not allowed");
            }

            const existWord = await Word.findById(wordId);

            if (!existWord) {
                throw new UserInputError("Word not found");
            }

            const commentIndex = existWord.comments.findIndex(
                (c) => c.id === commentId
            );

            if (commentIndex < 0) {
                throw new UserInputError("Comment not found");
            }

            if (
                existWord.comments[commentIndex].username !== user.username &&
                !user.isAdmin
            ) {
                throw new AuthenticationError("Action not allowed");
            }

            existWord.comments = existWord.comments.filter(
                (c) => c.id !== commentId
            );
            await existWord.save();
            return existWord;
        },
    },
};
