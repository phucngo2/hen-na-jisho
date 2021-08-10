const { AuthenticationError, UserInputError } = require("apollo-server");

const Word = require("../../models/Word");
const checkAuth = require("../../utils/authentication");

module.exports = {
    Query: {
        listWords: async () => {
            try {
                const words = await Word.find();
                return words;
            } catch (err) {
                throw new Error(err);
            }
        },

        getWord: async (parent, { wordId }) => {
            try {
                const word = await Word.findById(wordId);

                if (!word) {
                    throw new Error("Word not found");
                }

                return word;
            } catch (err) {
                throw new Error(err);
            }
        },

        searchWords: async (parent, { keyword }) => {
            try {
                const words = await Word.find({
                    $or: [
                        { jp: { $regex: keyword, $options: "i" } },
                        { vn: { $regex: keyword, $options: "i" } },
                        { en: { $regex: keyword, $options: "i" } },
                        { pronunciation: { $regex: keyword, $options: "i" } },
                        { romaji: { $regex: keyword, $options: "i" } },
                    ],
                });

                return words;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        createWord: async (
            parent,
            {
                wordInput: {
                    jp,
                    vn,
                    en,
                    romaji,
                    pronunciation,
                    description,
                    src,
                },
            },
            context
        ) => {
            const user = checkAuth(context);

            if (!user || !user.isAdmin) {
                throw new AuthenticationError("Action not allowed");
            }

            const newWord = new Word({
                jp,
                vn,
                en,
                romaji,
                pronunciation,
                description,
                src,
                comments: [],
                examples: [],
            });

            const word = await newWord.save();

            return word;
        },

        updateWord: async (
            parent,
            {
                wordInput: {
                    id,
                    jp,
                    vn,
                    en,
                    romaji,
                    pronunciation,
                    description,
                    src,
                },
            },
            context
        ) => {
            const user = checkAuth(context);

            if (!user || !user.isAdmin) {
                throw new AuthenticationError("Action not allowed");
            }

            // Word exist
            const existWord = await Word.findById(id);
            if (!existWord) {
                throw new UserInputError("Word not found");
            }

            existWord.jp = jp;
            existWord.vn = vn;
            existWord.en = en;
            existWord.romaji = romaji;
            existWord.pronunciation = pronunciation;
            existWord.description = description;
            existWord.src = src;

            await existWord.save();

            return existWord;
        },

        deleteWord: async (parent, { wordId }, context) => {
            const user = checkAuth(context);

            if (!user || !user.isAdmin) {
                throw new AuthenticationError("Action not allowed");
            }

            try {
                // Word exist
                const existWord = await Word.findById(wordId);
                if (!existWord) {
                    throw new UserInputError("Word not found");
                }

                await existWord.delete();

                return "Word deleted successfully!";
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
