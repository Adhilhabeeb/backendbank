import mongoose from "mongoose";
import transactionModel from "./transaction.model.js";
import leagerModel from "./leager.model.js";



let accountschema=new mongoose.Schema({

    userid:{
 type:mongoose.Schema.Types.ObjectId,
 unique:true,
 ref:"users",///////////////////////////////i users collection  the ecah used had and _id it wil autoimatically. crte while insertiong in it will tkes here
 required:[true,"the accounbt must. be associated with users "]  
 } ,

 status:{
    type:String,
    enum:{
        values:["Active","Frozen","Closed"],
        message:"status can be neither activ or inactive"
    },
    default:"Active"
 },
 currency:{
    type:String,
    default:"INR",
    enum:["AED","INR","USD"]
 },
 balance:{
    type:Number,
    default:0,

 }

},{
    timestamps:true
})

accountschema.index({userid:1,status:1})
accountschema.index({balance:1})

accountschema.methods.getbalance=  async function(){
const ledger = await leagerModel.aggregate([
  {
    $match: { account: this.userid }
  },
  {
    $group: {
      _id: null,
      totaldebit: {
        $sum: {
          $cond: [
            { $eq: ["$type", "debit"] },
            "$amount",
            0
          ]
        }
      },
      totalcredit: {
        $sum: {
          $cond: [
            { $eq: ["$type", "credit"] },
            "$amount",
            0
          ]
        }
      },
      transactions: {
        $push: "$$ROOT"
      }
    }
  },
  {
    $project: {
      _id: 0,
      transactions: 1,
      balance: {
        $subtract: ["$totalcredit", "$totaldebit"]
      }
    }
  }
])

console.log(ledger,"issleadggerrrr")
return ledger
}
let Accountmodel=await mongoose.model("accounts",accountschema)
export default Accountmodel