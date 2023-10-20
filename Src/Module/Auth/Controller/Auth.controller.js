import bcrypt from 'bcryptjs'
import UserModel from "../../../../Connection/Models/User.model.js";
import  jwt  from 'jsonwebtoken';
import sendEmail from '../../../Services/SendEmail.js';

export const signUp=async(req,res,next)=>{
    
      const {userName,email,password,age,gender}=req.body
      const user= await UserModel.findOne({email:email});
       if (user) {
         //  return res.status(210).json({error:'email exist'});
          return next(new Error('email exist'));
      } 
         const hashedPassword= bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
         const createUser=await UserModel.create({userName,email,password:hashedPassword,age,gender});
         
         const token=await jwt.sign({email},process.env.EMAILTOKENPASS,{expiresIn:'1h'});
         const RefreshToken=await jwt.sign({email},process.env.EMAILTOKENPASS,{expiresIn:60*60*24});
 
         const link=`${req.protocol}://${req.headers.host}/Auth/confirmEmail/${token}`;
         const RefreshLink=`${req.protocol}://${req.headers.host}/Auth/newConfirmEmail/${RefreshToken}`;
        
         const html=`<a href='${link}'>verify Email </a> <br/>or<br/> <a href='${RefreshLink}'>request another confirm link </a> `;
        
         sendEmail(email,"confirm Email",html);
         return res.json({messages:'success',createUser});
    
   }
   export const signIn=async(req,res,next)=>{
  
         const {email,password}=req.body;
         const user=await UserModel.findOne({email:email});
         if(!user){
            // return res.json({error:'email invalid'});       
            return next(new Error('email invalid'));       

         }
         if (!user.confirmEmail) {
            // return res.json({message :'please confirm your email'});
            return next(new Error('please confirm your email'));       

         }
         const isMach=await bcrypt.compareSync(password,user.password);
         if (!isMach) {
            // return res.json({error:'data invalid'});       
             return next(new Error('data invalid'));       
         }
         const token=await jwt.sign({userId:user._id,userName:user.userName},process.env.tokenPass);
         return res.json({message:'success',token});
   }
   export const confirmEmail=async(req,res,next)=>{
      let {token}=req.params;
      let decoded= await jwt.verify(token,process.env.EMAILTOKENPASS);
      let user=await UserModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
      if (user) {
         return  res.json({message:'email verified successfully'}) 
      }
   }
   export const newConfirmEmail=async(req,res,next)=>{
      let {RefreshToken}=req.params;
      let decoded= await jwt.verify(RefreshToken,process.env.EMAILTOKENPASS);

      const token=await jwt.sign({email:decoded.email},process.env.EMAILTOKENPASS,{expiresIn:'1h'});
      const link=`${req.protocol}://${req.headers.host}/Auth/confirmEmail/${token}`;
      const html=`<a href='${link}'>verify Email </a>`;
      sendEmail(decoded.email,"confirm Email",html);

         return  res.json({message:'your email sent successfully'}) ;
   
   }