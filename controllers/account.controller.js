import Accountmodel from  "../models/account.model.js"
import { transactionpropteries } from "../utils/index.js";


export  async function Createaccountcontroller(req,res) {
   
    try {


    const existingAccount = await Accountmodel.findOne({
      userid: req.user._id
    });

    if (existingAccount) {
       
      return res.status(409).json({
        success: false,
        message: "Account already exists",
        account:existingAccount
  
      });
    }

    const userAccount = await Accountmodel.create({
      userid: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      account: userAccount
    });
    } catch (error) {
         if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Account already exists for this user"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
    }
}