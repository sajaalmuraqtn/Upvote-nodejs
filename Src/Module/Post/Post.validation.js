import Joi from "joi";

export const PostSchema={
    body:Joi.object({
        title:Joi.string().required().min(5).max(30),
        caption:Joi.string().required().min(15).max(230)
    })
}