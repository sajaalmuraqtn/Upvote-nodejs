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
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)

userSchema.virtual('Posts',{
    localField:'_id',
    foreignField:'userId',
    ref:'Post'
})

const UserModel=mongoose.models.User||model('User',userSchema);
export default UserModel;