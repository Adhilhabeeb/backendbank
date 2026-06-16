import Accountmodel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";
import { transactionpropteries } from "../utils/index.js";


  
  
  export async function CreateTransaction(req,res) {
   let {
  fromaccount,
  toaccount,
  amount,
  status,
  idempotencykey
} = req.body;
 
    res.json({message:"transaction created",data:transactionpropteries})
if (!fromaccount || !toaccount || !amount || !idempotencykey) {
  return res.status(400).json({
    success: false,
    message: "All fields are required"
  });
}
//checkaccunt fond 
let fromaaccfound=await Accountmodel.findById(fromaccount)
let toaccountfoud=await Accountmodel.findById(toaccount)

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

if(transactionexist.status=="success"){
    return res.status(400).json({
        success:false,
        message:"Transaction already proceed"
    })
} else if (transactionexist.status=="pending") {
    return res.status(400).json({
        success:false,
        message:"Transaction already pending"
    })
}else if (transactionexist.status=="failed") {
    return res.status(400).json({
        success:false,
        message:"Transaction already failed"
    })
}else if(transactionexist.status=="reversed"){
     
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





  }