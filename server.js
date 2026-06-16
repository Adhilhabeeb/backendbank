import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./config/db/db.js";
import auth from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import accountrouter from "./routes/account.route.js";
import { authenticate } from "./middleware/authmiddleware.js";
import Transacrtionrouter from "./routes/transaction.route.js";
const app=express();


dotenv.config()
ConnectDb()

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/api/auth",auth)
app.use("/api/accounts",authenticate,accountrouter)
app.use("/api/transaction",authenticate,Transacrtionrouter)

app.listen(5000,()=>{
    console.log("server started on port 5000");
})
