import mongoose from "mongoose";

 import bcrypt from "bcryptjs"
let userschema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"enter email"],
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        trim:true,
        unique:true, 
        lowercase:true    ,

    },
    name:{
        type:String,
        required:[true,"enter name"],
        trim:true,

    },
    password:{
        type:String,
        required:[true,"enter password"],
        minlength:[6, "minimum six characters"],
        select:false ///. ithil select ennal  ee password ennath dataBase il nnu fetch cheythu edukkumbol varilla  ath false anell
    }
},{
    timestamps:true
})
//   userschema.index({email:1},{sparse:true})//. ee sparse means it. wil only create index  for the documents only. have email field 
//   userschema.index({name:1,email:1},{
//     unique:true,
//     partialFilterExpression:{
//     name:null
// }
//   })  // in here  the name and email must be unique the user cant create another account with the same name and email  also   partialFilterExpression. ithil. aa
//aa condition name ==null olla document mahram   ithilnte working enthacha  uinquem pinne partialum vannallleee


userschema.pre("save", async function(next){
    if(!this.isModified("password")){
        return ;
    }
  let hash=  await bcrypt.hash(this.password,10)
  this.password=hash
  return 
})








userschema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

export default mongoose.model("users",userschema)