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