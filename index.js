import * as dotenv from 'dotenv'
import express from 'express'
import initApp from './Src/app.router.js';
import connectDB from './Connection/Connection.js';
 dotenv.config();
 const app =express();
 connectDB();

 initApp(app,express);
  const port=process.env.Port||3000;
 app.listen(port,()=>{
    console.log('server is running in 4000');
 })