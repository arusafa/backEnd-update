const mongoose = require('mongoose');
const { isEmail } = require("validator");

const tutorSchema = new mongoose.Schema({
  firstname:{
    type:String,
    maxLength:50,
    minLength:3
  },
  lastname:{
    type:String,
    maxLength:50
  },
  email:{
    type:String,
    required:[true,"Please enter your email"],
    maxLength:50,
    unique:true,
    validate:[isEmail,"Please enter a valid email address"]
  },
  phone:{
    type:Number,
    maxLength:13
  },
  password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[6,"Password must be at least 6 characters long"],
  },
  isAccountVerified: {
    type: String,
    default:"false"
  },
  accountCreated: {
    type: Date,
    default: Date.now
  },
})

const Tutor =mongoose.model("tutor",tutorSchema)
module.exports=Tutor

/*
{
  "firstname":"testfirstanme",
  "lastname":"testlast",
  "email":"test@testemail.com",
  "phone":"6473453212",
  "password":"test@testemail.com"
}
*/
