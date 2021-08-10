import gql from "graphql-tag";

export const LIST_WORDS_ADMIN = gql`
    query {
        listWords {
            id
            jp
            vn
        }
    }
`;

export const LIST_WORDS = gql`
    query {
        listWords {
            id
            jp
            vn
            en
            pronunciation
        }
    }
`;

export const GET_WORD = gql`
    query ($wordId: ID!) {
        getWord(wordId: $wordId) {
            id
            jp
            vn
            en
            romaji
            pronunciation
            description
            src
            examples {
                id
                jp
                vn
            }
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export const SEARCH_WORDS = gql`
    query ($keyword: String!) {
        searchWords(keyword: $keyword) {
            id
            jp
            vn
            en
            pronunciation
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!) {
        register(registerInput: { username: $username, password: $password }) {
            id
            username
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            isAdmin
            token
        }
    }
`;

export const CREATE_WORD = gql`
    mutation createWord(
        $jp: String!
        $vn: String!
        $en: String!
        $romaji: String!
        $pronunciation: String!
        $description: String!
        $src: String!
    ) {
        createWord(
            wordInput: {
                jp: $jp
                vn: $vn
                en: $en
                romaji: $romaji
                pronunciation: $pronunciation
                description: $description
                src: $src
            }
        ) {
            id
            jp
            vn
        }
    }
`;

export const DELETE_WORD = gql`
    mutation deleteWord($wordId: ID!) {
        deleteWord(wordId: $wordId)
    }
`;

export const UPDATE_WORD = gql`
    mutation updateWord(
        $id: ID!
        $jp: String!
        $vn: String!
        $en: String!
        $romaji: String!
        $pronunciation: String!
        $description: String!
        $src: String!
    ) {
        updateWord(
            wordInput: {
                id: $id
                jp: $jp
                vn: $vn
                en: $en
                romaji: $romaji
                pronunciation: $pronunciation
                description: $description
                src: $src
            }
        ) {
            id
            jp
            vn
            en
            pronunciation
            description
            src
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($wordId: ID!, $body: String!) {
        createComment(wordId: $wordId, body: $body) {
            id
            jp
            vn
            en
            romaji
            pronunciation
            description
            src
            examples {
                id
                jp
                vn
            }
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($wordId: ID!, $commentId: ID!) {
        deleteComment(wordId: $wordId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export const CREATE_EXAMPLE = gql`
    mutation createExample($wordId: ID!, $jp: String!, $vn: String!) {
        createExample(wordId: $wordId, jp: $jp, vn: $vn) {
            id
            jp
            vn
            en
            romaji
            pronunciation
            description
            src
            examples {
                id
                jp
                vn
            }
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export const DELETE_EXAMPLE = gql`
    mutation deleteExample($wordId: ID!, $exampleId: ID!) {
        deleteExample(wordId: $wordId, exampleId: $exampleId) {
            id
            examples {
                id
                jp
                vn
            }
        }
    }
`;
