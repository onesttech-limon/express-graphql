import express from "express";
import { ApolloServer } from "@apollo/server";

import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import blogSchema from "./graphql/schemas/blogSchema";
import blogResolver from "./graphql/resolvers/bolgResolvers";

dotenv.config();

const server = new ApolloServer({
  typeDefs: blogSchema,
  resolvers: blogResolver,
  includeStacktraceInErrorResponses: false,
  introspection: true,
});

const URI = process.env.MONGO_URI as string;

mongoose.set("strictQuery", true);
mongoose
  .connect(URI, {})
  .then(() => {
    console.log("Connected to MongoDB..");
    return startStandaloneServer(server, {
      listen: { port: 4000 },
    });
  })
  .then((server) => {
    console.log(`🚀  Server ready at: ${server.url}/grpahql`);
  });
