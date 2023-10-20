import bcrypt from 'bcryptjs'
import UserModel from "../../../../Connection/Models/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const getUsers=async(req,res)=>{
        let users =await UserModel.find();
        return res.json({message:'success',users})
}

export const profile=async(req,res,next)=>{
        if (!req.file) {
              return  next(new Error('please provide a file'))
        }

        const cloud= await cloudinary.uploader.upload(req.file.path,{
                folder:`${process.env.APP_NAME}/user/${req.user._id}/profile`
        })
        const {secure_url,public_id} = cloud;
        if (public_id) {
                const user =await UserModel.findByIdAndUpdate(req.user._id,{profilePic:{secure_url,public_id}},{new:false});
                cloudinary.uploader.destroy(user.profilePic.public_id)
        }
        const user =await UserModel.findByIdAndUpdate(req.user._id,{profilePic:{secure_url,public_id}},{new:false});
        return res.json({message:"profile image updated",Image:{secure_url,public_id}});
}

export const updatePassword=async(req,res,next)=>{
     const {oldPassword,newPassword}=req.body;
     const user=await UserModel.findOne({_id:req.user._id});
     const match= await bcrypt.compareSync(oldPassword,user.password);
     if(!match){
        return next(new Error('old password invalid'));
     }
     if (oldPassword==newPassword) {
        return next(new Error('password never changed'));
     }
     const hashNewPassword=bcrypt.hashSync(newPassword,parseInt( process.env.SALTROUND));
     await UserModel.findByIdAndUpdate({_id:req.user._id},{password:hashNewPassword},{new:true});
    return res.json({message:'success'})
}