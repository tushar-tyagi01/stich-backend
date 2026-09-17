import mongoose from "mongoose";

 async function connectDB(){
    try{
        const connect=await mongoose.connect(process.env.DB_URL);
        console.log("Mongodb connected successfully");
    }
    catch(error){
        console.log("mongodb connection failed :",error);
        process.exit(1);
    }
    
}

export default connectDB;