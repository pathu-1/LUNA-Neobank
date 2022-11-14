const { gql } = require("apollo-server-express");

const typeDefs = gql`
    input UserInput{
        first_name: String
        last_name: String
        email: String
        password: String
        phone_number: String
        pan_card: String
        aadhar_card: String
        address: String
    }

    input LoginInput{
        email: String
        password: String
    }

    type Currency{
        name: String
        symbol: String
        image: String
    }

    type User{
        id: ID
        first_name: String
        last_name: String
        email: String
        phone_number: String
        pan_card: String
        aadhar_card: String
        address: String
    }

    type AuthData{
        id: ID
        token: String!
        expiresIn: String!
    }

    type Query{
        getAllUsers: [User]
        loginUser(login: LoginInput): AuthData
        getCurrency(currency: String): Currency
        getAllCurrencies: [Currency]
        getUserById(id: ID): User
    }

    type Mutation{
        createUser(user: UserInput): User
        deleteUserById(id: ID): String
    }
`

module.exports = typeDefs;