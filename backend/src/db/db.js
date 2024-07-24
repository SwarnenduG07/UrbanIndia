import { connect, Schema, model } from "mongoose";
connect(process.env.DATABASE_URL)
const userSChema =Schema({
    fullname:String,
    userName: String,
    dateOfBirth: "",

})

const user = model('user' , userSChema);
export default {
 user,
}