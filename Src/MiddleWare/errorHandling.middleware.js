export const asyncHandler=(fn)=>{
return (req,res,next)=>{
    fn(req,res,next).catch((error)=> {
            return res.json({message:"catch error",error:error.stack});
    })
}

}

export const globalError=(err,req,res,next)=>{
    if (err.message) {      
        return res.json({message:err.message});
    }
    else{
        return res.json({message:'global error'});
    }
}