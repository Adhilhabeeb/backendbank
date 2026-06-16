
import mongoose from "mongoose";
export  async function ConnectDb() {


try {
  await mongoose.connect(process.env.MONGOURL);
  console.log("Database Connected");
} catch (error) {
  console.error("Database Connection Failed");
  process.exit(1);
}
}