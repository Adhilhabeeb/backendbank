

import jwt from "jsonwebtoken"
import UsersModel from "../models/users.model.js";

    export async function authenticate(req,res,next) {
   

let token =req.cookies.token ??req.headers.authorization?.split(" ")[1]

if (!token) {
    return res.status(401).json({message:"you are not authorised to access this route"})
}

try {
let valid=jwt.verify(token,process.env.JWT)


   if (valid) {
let user= await UsersModel.findById(valid.userid) 
   console.log(user,"is userrr")
   req.user=user
    next();
   }
    
} catch (error) {
    return res.status(401).json({
        message: "Invalid token"
    });
}
   

    }
    
    
