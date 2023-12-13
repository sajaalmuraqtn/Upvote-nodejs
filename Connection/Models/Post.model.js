import mongoose, { Schema,Mongoose, model, Types } from "mongoose";

const postSchema=new Schema(
    {
        title:{
            type:String,
            require:true
        }, 
        caption:{
           type:String,
        },
        image:{
           type:Object,
           require:true
        },
        like:[{
            type:Types.ObjectId,
            ref:'User'
        }],
        unlike:[{
            type:Types.ObjectId,
            ref:'User'
        }],
        totalVote:{
            type:Number,
            default:0
        } ,
        isDeleted:{
        type:Boolean,
        default:false      
        },
        userId:{
            type:Types.ObjectId,
            ref:'User',
            require:true
        }
    },{
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)

 postSchema.virtual('Comments',
{
    localField:'_id',
    foreignField:'postId',
    ref:'Comment'
});
const PostModel=mongoose.models.Post||model('Post',postSchema);
export default PostModel;