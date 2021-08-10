const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        isAdmin: Boolean!
        token: String!
    }

    type Word {
        id: ID!
        jp: String!
        en: String!
        vn: String!
        romaji: String!
        pronunciation: String!
        description: String!
        src: String!
        examples: [Example!]
        comments: [Comment!]
        commentCount: Int!
    }

    type Example {
        id: ID!
        jp: String!
        vn: String!
    }

    type Comment {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
    }

    input WordInput {
        id: ID
        jp: String!
        vn: String!
        en: String!
        romaji: String!
        pronunciation: String!
        description: String!
        src: String!
    }

    type Query {
        listWords: [Word]
        getWord(wordId: ID!): Word
        searchWords(keyword: String!): [Word]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createWord(wordInput: WordInput): Word!
        updateWord(wordInput: WordInput): Word!
        deleteWord(wordId: ID!): String!
        createComment(wordId: ID!, body: String!): Word!
        deleteComment(wordId: ID!, commentId: ID!): Word!
        createExample(wordId: ID!, jp: String!, vn: String!): Word!
        deleteExample(wordId: ID!, exampleId: ID!): Word!
    }
`;
