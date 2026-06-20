import mongoose from "mongoose";
import Accountmodel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";
import { transactionpropteries } from "../utils/index.js";
import leagerModel from "../models/leager.model.js";


  
  
  export async function CreateTransaction(req,res) {
   let {

  toaccount,
  amount,
  idempotencykey
} = req.body;
 
    
if (  !toaccount || !amount || !idempotencykey) {
  return res.status(400).json({
    success: false,
    message: "All fields are required"
  });
}
//checkaccunt fond 
let fromaaccfound=await Accountmodel.findOne({userid:req.user._id})
let toaccountfoud=await Accountmodel.findOne({userid:toaccount})
console.log(fromaaccfound,"andddn",toaccountfoud)
if (!fromaaccfound) {
  return res.status(404).json({
    success: false,
    message: "From account not found"
  });
}
if (!toaccountfoud) {
  return res.status(404).json({
    success: false,
    message: "To account not found"
  });
}
//cecktransaction

let transactionexist= await transactionModel.findOne({idempotencykey:idempotencykey})

if(transactionexist?.status=="success"){
    return res.status(400).json({
        success:false,
        message:"Transaction already proceed"
    })
} else if (transactionexist?.status=="pending") {
    return res.status(400).json({
        success:false,
        message:"Transaction already pending"
    })
}else if (transactionexist?.status=="failed") {
    return res.status(400).json({
        success:false,
        message:"Transaction already failed"
    })
}else if(transactionexist?.status=="reversed"){
     
    res.status(500).json({
        success:false,
        message:"transaction already reversed"
    })

    
}
if (!fromaaccfound.status=="Active" || !toaccountfoud.status=="Active") {
    res.status(400).json({
        success:false,
        message:"transaction is failed because from or to account is not active"
    })
}

let accountecationandbalance= await fromaaccfound.getbalance()

console.log(accountecationandbalance
,"is from user account balanca")


if (accountecationandbalance.balance<amount){
return res.status(400).json({
  success:false,
  message:` requested amount ${amount} bigger than balance ${accountecationandbalance.balance} `
})

}



let session=await mongoose.startSession()
session.startTransaction()
let transaction= await transactionModel.create({
  fromaccount:fromaaccfound._id,
  toaccount:toaccountfoud._id,
  amount
  ,status:"pending",
  idempotencykey:idempotencykey
  
})

let fromuserleadger=await leagerModel.create({
  amount,account:fromaaccfound._id,
  transaction:transaction._id,
  type:"debit",
  session:session
})    

let toaccountuserleadger=await leagerModel.create({
  amount,account:toaccountfoud._id,
  transaction:transaction._id,
  type:"credit",
  session:session  
})

transaction.status="success"
await transaction.save({session:session})


await session.commitTransaction()

session.endSession()


return res.status(200).json({
  success:true,message:"transaction coopleeted successfully",
  transaction:transaction,

  
})





















  }