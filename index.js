const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const server = new ApolloServer({
    typeDefs,
    cors: {
        origin: "*",
        credentials: true,
    },
    resolvers,
    context: ({ req }) => ({ req }),
});

const PORT = process.env.port || 9000;

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("DB connected!");
        server.listen(PORT, () => console.log(`Running on port ${PORT}!`));
    })
    .catch((err) => console.log(err));
