import express from "express"
import { CreateTransaction } from "../controllers/transaction.acc.js"
import {  systemauthmiddleware } from "../middleware/authmiddleware.js"
let Transacrtionrouter=express.Router()

Transacrtionrouter.post("/create",systemauthmiddleware,CreateTransaction)

export default Transacrtionrouter