
import { sendemail } from "../config/db/nodemailer.js";
import usersModel from "../models/users.model.js";
import UsersModel from "../models/users.model.js";
import jwt  from "jsonwebtoken";
import nodemailer from "nodemailer";


export async  function Registerauthcontroller(req,res) {
    let {name,password,email}=req.body
    let exist=await UsersModel.findOne({email:email})
    if(exist){ 
        return res.status(400).json({message:"user already exists"})    
    }
 let user=await UsersModel.create({name,password,email})

user.save()
let token=jwt.sign({userid:user._id},process.env.JWT,{
    expiresIn:"1h"
})
 let {password:passwod,...rest}=user["_doc"]

res.cookie("token",token)
return res.status(201).json(rest)
}

// /loginnn.  
// api/auth/login
export async function LoginauthController(req,res) {
    let {email,password}=req.body
console.log(email,password)
   let user=await UsersModel.findOne({email:email}).select("+password")
  console.log(user,"isa usert")
if (!user) {
     res.status(401).json({message:"user not found"})
}
let valid= await  user.comparepassword(password)

if (!valid) {
    return res.status(401).json({message:"invalid username and password"})
}


sendemail(email,"login success","you have been successfully logged in")
console.log("Mail sent");
let token=jwt.sign({userid:user._id},process.env.JWT,{
    expiresIn:"1h"
})
 let {password:passwod,...rest}=user["_doc"]

res.cookie("token",token)

return res.status(200).json({message:"SUCCESSFULLY LOGGED IN",user:rest,status:"SUCCESS"})
}