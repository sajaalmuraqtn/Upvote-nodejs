import mongoose, { Schema,Mongoose, model } from "mongoose";

const userSchema=new Schema(
    {
        userName:{
            type:String,
            require:true
        }, 
        email:{
           type:String,
           require:true,
           unique:true
        },
        password:{
            type:String,
            require:true
        },
        age:{
            type:Number,
        },
   
        gender:{
            type:String,
            default:'Male',
            enum:['Male','Female']
        },
        confirmEmail:{
            type:Boolean,
            default:false
        },
        profilePic:{
            type:Object
        }
    },{
        timestamps:true
    }
)

const UserModel=mongoose.model.User||model('User',userSchema);
export default UserModel;