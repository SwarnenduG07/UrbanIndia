import mongoose, { connect, Schema, model } from "mongoose";
connect(process.env.DATABASE_URL)

const userSChema =  new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        trim: true,
        maxLength:30,
    },
    lastname: {
        type: String,
        require: true,
        trim:  true,
        maxLength: 30,
        
    },
    username: {
        type: String,
        require:true,
        unique: true,
        trim: true,
        lowercase:  true,
        minLength:3,
        maxLength: 30,
    },
    password:{
        type: String,
        require:true,
        trim: true,
        minLength: 6,
        maxLength: 20,
    },

})

const User = model('User' , userSChema);
export default {
  User,
}