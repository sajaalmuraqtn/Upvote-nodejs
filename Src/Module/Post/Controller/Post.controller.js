import PostModel from "../../../../Connection/Models/Post.model.js";
import cloudinary from "../../../Services/cloudinary.js";



export const GetALLPosts=async(req,res)=>{
       let Posts = await PostModel.find().populate('Comments');

        return res.json({message:'success',Posts})
    }
export const GetSpecificPost=async(req,res,next)=>{
       const id=req.params.id;
       let Post = await PostModel.findById(id).populate('Comments');
       if (!Post) {
        return next(new Error('post invalid'));       
       }

        return res.json({message:'success',Post})
    }
    

export const Create=async(req,res,next)=>{
    const {caption}=req.body;
    const id=req.user._id;
    const title =req.body.title.toLowerCase(); 

    if (await PostModel.findOne({title}).select('title')){
        return res.json({message:'post title already exist'});
    }
    
    if (!req.file) {
        return  next(new Error('please provide a file'))
  }

  const cloud= await cloudinary.uploader.upload(req.file.path,{
          folder:`${process.env.APP_NAME}/user/${id}/PostImage`
  })
   const userPost=await PostModel.create({title,caption,image:{public_id:cloud.public_id,secure_url:cloud.secure_url} ,userId:id})
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

export const softDelete=async(req,res,next)=>{
    const {id}=req.params;//post id
    const userId=req.user._id;
    const post= await PostModel.findById(id);
    if (!post) {
        return next(new Error('post invalid'));       
    }
    if (post.userId!=userId) {
        return next(new Error('not auth user'));       
    }
    post.isDeleted=true;
    await post.save();
    return res.json({message:'success',post});
}

export const hardDelete=async(req,res,next)=>{
    const {id}=req.params;//post id
    const userId=req.user._id;
    const post= await PostModel.findById(id);
    if (!post) {
        return next(new Error('post invalid'));       
    }
    if (post.userId!=userId) {
        return next(new Error('not auth user'));       
    }
    if ( post.isDeleted!=true) {
        return next(new Error('can not delete'));       
    }
    const hardDeletePost=await PostModel.findByIdAndDelete(id);

    return res.json({message:'success',hardDeletePost});
}