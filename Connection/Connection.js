import mongoose,{Mongoose} from "mongoose";

 const connectDB=async()=>{

    await mongoose.connect(process.env.DBconnect).then(()=>{
        console.log('DB connect established successfully');
    }).catch((error)=>{
        console.log('Error with connect db',error);
    });
 }

export default connectDB;