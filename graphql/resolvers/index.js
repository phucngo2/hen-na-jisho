const wordsResolver = require("./words");
const usersResolver = require("./users");
const commentResolver = require("./comments");
const exampleResolver = require("./examples");

module.exports = {
    Word: {
        commentCount: (parent) => parent.comments.length,
    },

    Query: {
        ...wordsResolver.Query,
    },

    Mutation: {
        ...wordsResolver.Mutation,
        ...usersResolver.Mutation,
        ...commentResolver.Mutation,
        ...exampleResolver.Mutation,
    },
};
