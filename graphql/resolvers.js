const BASE_URL = "https://api.simpleswap.io/"
const API_KEY = "19d84a21-05c5-4854-920d-b699f5e4e74c"
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const resolvers = {
    Query:{
        getCurrency: async (parents,  args, context, info) =>{
            const CURRENCY_URL = BASE_URL + "get_currency";
            try{
                const { currency } = args;
                const request = await axios.get(`${CURRENCY_URL}?api_key=${API_KEY}&symbol=${currency}`);
                const data = await request.data;
                return data;
            }
            catch(err){
                throw err;
            }
        },
        getAllCurrencies: async (parents, args, context, info) =>{
            const ALL_CURRENCY_URL = BASE_URL + "get_all_currencies";
            try{
                const request = await axios.get(`${ALL_CURRENCY_URL}?api_key=${API_KEY}`);
                const data = await request.data;
                return data;
            }
            catch(err){
                throw err;
            }
        },
        getAllUsers: async (parents,  args, context, info) =>{
            try{
                const users = await User.find({});
                return users;
            }
            catch(err){
                throw err;
            }
        },
        loginUser: async (parents,  args, context, info) =>{
            try{
                const {email, password} = args.login;
                const user = await User.findOne({ email: email });
                if(!user){
                    throw new Error("User does not exist");
                }
                const isEqual = await bcrypt.compare(password, user.password);
                if(!isEqual){
                    throw new Error("Password is incorrect!");
                }
                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    'somesupersecretkey',
                    {
                      expiresIn: '1h'
                    }
                );
                return {
                    id: user.id,
                    token: token,
                    expiresIn: 1
                }
            }
            catch(err){
                throw err;
            }
        },
        getUserById: async (parents, args, context, info) =>{
            try{
                const user = await User.findById(args.id);
                return user
            }
            catch(err){
                throw err;
            }
        },
    },
    Mutation:{
        createUser: async (parents,  args, context, info) =>{
            try{
                const { first_name, last_name, email, password, phone_number, pan_card, aadhar_card, address } = args.user;
                const existingUser = await User.findOne({ email: email});
                if(existingUser){
                    throw new Error("User exist already.");
                }
                const hashedPassword = await bcrypt.hash(password, 12);
                
                const user = new User({
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    pan_card,
                    aadhar_card,
                    address,
                    password: hashedPassword
                })
                const result = await user.save();
                return {
                    ...result._doc,
                    password: null,
                    id: result.id
                }
            }
            catch(err){
                throw err;
            }
        },
        deleteUserById: async (parents, args, context, info) =>{
            try{
                const user =await User.findByIdAndDelete(args.id);
                return "User is deleted sucessfully."
            }
            catch(err){
                throw err;
            }
        }
    }
}


module.exports = resolvers;