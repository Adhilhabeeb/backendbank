import express from "express"
import { Createaccountcontroller } from "../controllers/account.controller.js"

let accountrouter=express.Router()

accountrouter.post("/create",Createaccountcontroller)


export default accountrouter