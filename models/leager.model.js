import mongoose from "mongoose";

let ledgerschema= new mongoose.Schema({

account:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"accounts",
    required:[true,"the fromaccount must be associated with users"],
    unique:true,
    immutable:true
},
amount:{
    type:Number,
    required:[true,"the amount must be associated with users"],
immutable:true,
    index:true

},
transaction:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"transactions",
  required:[true,"the transaction must be associated with accounts"],
  immutable:true,
  index:true



},
type:{
    type:String,
    enum:{ values:["credit","debit"],message:"allow only the credit or debit in ledger"},
    required:[true,"the type must be  required in ledger"],
    immutable:true
}


},{
    timestamps:true
})

function preledgerstopper(){
    return   new Error(" cant. mutatte te egder");
    
}

ledgerschema.pre("findOneAndUpdate",preledgerstopper)
    ledgerschema.pre("deleteOne",preledgerstopper)
    ledgerschema.pre("deleteMany",preledgerstopper)
    ledgerschema.pre("updateOne",preledgerstopper)
    ledgerschema.pre("updateMany",preledgerstopper)
    ledgerschema.pre("replaceOne",preledgerstopper)
    ledgerschema.pre("replaceMany",preledgerstopper)

export default mongoose.model("ledger",ledgerschema)