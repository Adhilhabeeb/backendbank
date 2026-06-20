import mongoose from "mongoose";

let Transactionsche= new mongoose.Schema({

fromaccount:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"accounts",
    required:[true,"the fromaccount must be associated with users"],
    
},
toaccount:{
     type:mongoose.Schema.Types.ObjectId,
    ref:"accounts",
    required:[true,"the fromaccount must be associated with users"],

},
amount:{
    type:Number,
    required:[true,"the amount must be associated with users"],
    minlength:0.5,
    index:true

},
status:{
    type:String,
    enum:["pending","success","failed","reversed"],
    required:[true,"the status must be associated with users"]
},
idempotencykey:{
type:String,
required:[true,"the idempotencykey must be associated with users"],
unique:true,

}


},{
    timestamps:true
})


export default mongoose.model("transactions",Transactionsche)