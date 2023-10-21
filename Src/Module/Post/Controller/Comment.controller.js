import CommentModel from "../../../../Connection/Models/Comment.model.js";
import PostModel from "../../../../Connection/Models/Post.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const createComment=async(req,res,next)=>{
    req.body.postId=req.params.id;
    req.body.userId=req.user._id;
    const post=await PostModel.findOne({_id:req.body.postId});
    if (!post) {
        await next(new Error('invalid post id'));
    }
    if(req.file){
        const cloud= await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/user/${req.body.userId}/Post/req.body.postId/comment`
    })
        req.body.image={public_id:cloud.public_id,secure_url:cloud.secure_url};
    }
    const comment=await CommentModel.create(req.body);
    return res.json({ message:'success',comment});
}

export const likeComment=async(req,res,next)=>{
    const id=req.params.id;//post id
    const commentID=req.params.commentID;//commentID
    const like=await CommentModel.findByIdAndUpdate(commentID,{
        $addToSet:{like:req.user._id},
        $pull:{unlike:req.user._id}
    },{
        new:true
    })
    return res.json({ message:'success',like});
}
export const unlikeComment=async(req,res,next)=>{
    const id=req.params.id;//post id
    const commentID=req.params.commentID;//commentID
    const unlike=await CommentModel.findByIdAndUpdate(commentID,{
        $addToSet:{unlike:req.user._id},
        $pull:{like:req.user._id}
    },{
        new:true
    })
    return res.json({ message:'success',unlike});
}