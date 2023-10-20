import jwt from "jsonwebtoken"
import UserModel from "../../Connection/Models/User.model.js";
import { asyncHandler } from "./errorHandling.middleware.js";

export const auth = asyncHandler (async (req, res, next) => {
  
        const Authorization= req.headers.authorization;
        if (!Authorization?.startsWith(process.env.BEARER)) {       
          return res.json({ error: 'invalid Authorization' });
        } 
        const token=Authorization.split(process.env.BEARER)[1];
        const decoded=await jwt.verify(token,process.env.tokenPass);
        if (!decoded) {
          return res.json({ error: 'invalid Authorization' });
        }
        const authUser=await UserModel.findById(decoded.userId).select("userName email");
        if (!authUser) {
            return res.json({ error: 'not register account'});
        }
        req.user=authUser;
        next()

}
)