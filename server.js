const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/isauth");
require("dotenv").config();
const port = process.env.PORT;
const app = express();



app.use(body_parser.json());
app.use(cors());
app.use(isAuth);

const graphql_server = async () =>{
    const apollo = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apollo.start();
    apollo.applyMiddleware({ app: app});
}

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/Neobank")
    .then(()=> console.log("connected with mongodb"))
    .catch((err) => console.log(err));

graphql_server();
app.listen(port, ()=>{
    console.log(`Server is working on http://localhost:${port}`);
});