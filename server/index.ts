import express from "express";
import cors from 'cors';
import router from './router.js';

import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary'
import db from './models/db.js';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

db().catch((error) => console.log(error));

async function startServer() {
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  
    return server;
  }
  
  if (require.main === module) {
    // If this file is run directly, start the server
    startServer();
  }

   export default startServer;