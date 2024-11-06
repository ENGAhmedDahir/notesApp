import mongoose from "mongoose";

import { dbURI } from "./config.js";

const connectDb = async  ()=>{
    try{
        await mongoose.connect(dbURI);
        console.log("Connected to mongo db")
    }catch(e){
        console.error(`Failed to connect to MongoDB: ${e.message}`);
        process.exit(1);
    }
}
export default connectDb;