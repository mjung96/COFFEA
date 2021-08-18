const { ApolloServer } = require('apollo-server');
/*import { ApolloServer } from "apollo-server";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";*/
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

//creating the server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],*/
    context: ({ req }) => ({ req })
});

//connect the database and run server
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connection made');
        return server.listen({ port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });