import express from "express"

import { LoginauthController, Registerauthcontroller } from "../controllers/auth.controller.js";
let auth=express.Router();

auth.post("/register",Registerauthcontroller)
auth.post("/login",LoginauthController)
export default auth;
