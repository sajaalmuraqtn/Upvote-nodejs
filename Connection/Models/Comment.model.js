import mongoose, { Schema,Mongoose, model, Types } from "mongoose";

const commentSchema=new Schema(
    {
        text:{
            type:String,
            require:true
        },
        image:{
           type:Object
        },
        like:[{
            type:Types.ObjectId,
            ref:'User'
        }],
        unlike:[{
            type:Types.ObjectId,
            ref:'User'
        }],
        isDeleted:{
        type:Boolean,
        default:false      
        },
        userId:{
            type:Types.ObjectId,
            ref:'User',
            require:true
        },
        postId:{
            type:Types.ObjectId,
            ref:'Post',
            require:true
        }
    },{
        timestamps:true
    }
)

const CommentModel=mongoose.models.Comment||model('Comment',commentSchema);
export default CommentModel;