const { UserInputError, AuthenticationError } = require("apollo-server");

const checkAuth = require("../../utils/authentication");
const Word = require("../../models/Word");

module.exports = {
    Mutation: {
        createExample: async (parent, { wordId, jp, vn }, context) => {
            const user = checkAuth(context);

            if (!user || !user.isAdmin) {
                throw new AuthenticationError("Action not allowed");
            }

            if (jp.trim() === "" || vn.trim() === "") {
                throw new UserInputError("Empty field(s)", {
                    errors: {
                        general: "Form fields must not empty",
                    },
                });
            }

            const existWord = await Word.findById(wordId);

            if (!existWord) {
                throw new UserInputError("Word not found");
            }

            existWord.examples.push({
                jp: jp,
                vn: vn,
            });

            await existWord.save();
            return existWord;
        },

        deleteExample: async (parent, { wordId, exampleId }, context) => {
            const user = checkAuth(context);

            if (!user || !user.isAdmin) {
                throw new AuthenticationError("Action not allowed");
            }

            const existWord = await Word.findById(wordId);

            if (!existWord) {
                throw new UserInputError("Word not found");
            }

            const exampleIndex = existWord.examples.findIndex(
                (e) => e.id === exampleId
            );

            if (exampleIndex < 0) {
                throw new UserInputError("Example not found");
            }

            existWord.examples = existWord.examples.filter(
                (e) => e.id !== exampleId
            );

            await existWord.save();
            return existWord;
        },
    },
};
