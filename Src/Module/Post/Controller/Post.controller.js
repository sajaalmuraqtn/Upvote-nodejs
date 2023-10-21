import PostModel from "../../../../Connection/Models/Post.model.js";
import cloudinary from "../../../Services/cloudinary.js";



export const GetALLPosts=async(req,res)=>{
    let Posts =await PostModel.find();
        return res.json({message:'success',Posts})
    }

export const Create=async(req,res,next)=>{
    const {title,caption}=req.body;
    const id=req.user._id;
    if (!req.file) {
        return  next(new Error('please provide a file'))
  }

  const cloud= await cloudinary.uploader.upload(req.file.path,{
          folder:`${process.env.APP_NAME}/user/${id}/PostImage`
  })
   const userPost=await PostModel.create({title,caption,image:{public_id:cloud.public_id,secure_url:cloud.secure_url}})
    return res.json({message:'success',userPost})
}


export const LikePost=async(req,res,next)=>{
 
    const {id}=req.params;//post id
    const userId=req.user._id;
   const likePost=await PostModel.findByIdAndUpdate(id,
     {$addToSet:{like:userId},$pull:{unlike:userId}}
   ,{new:true});
    likePost.totalVote=likePost.like.length-likePost.unlike.length;
    await likePost.save();
    return res.json({message:'success',likePost});
}

export const unLikePost=async(req,res,next)=>{
 
    const {id}=req.params;//post id
    const userId=req.user._id;
   const unlikePost=await PostModel.findByIdAndUpdate(id,
     {$addToSet:{unlike:userId},$pull:{like:userId}}
   ,{new:true});
    unlikePost.totalVote=unlikePost.like.length-unlikePost.unlike.length;
    await unlikePost.save();
    return res.json({message:'success',unlikePost});
}

