import multer from "multer";
import { nanoid } from 'nanoid'

export const fileValidation={
    image:['image/jpeg','image/png','image/webp'],
    pdf:['application/pdf']
}
 function  fileUpload (customerValidation=[]){
    
    const storage=multer.diskStorage({ });

    function fileFilter(req,file,cb){
        if (customerValidation.includes(file.mimetype)) {
            cb(null,true);
        } else {
            cb('invalid format',false);
        }
    }
   const upload=multer({fileFilter:fileFilter,storage:storage});
    return upload;

}
export default fileUpload;