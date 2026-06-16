import express from "express"
import { CreateTransaction } from "../controllers/transaction.acc.js"
import { authenticate } from "../middleware/authmiddleware.js"
let Transacrtionrouter=express.Router()

Transacrtionrouter.post("/create",authenticate,CreateTransaction)

export default Transacrtionrouter