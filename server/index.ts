import express from "express";
import cors from 'cors';
import router from './router';
require("dotenv").config();
import { config as cloudinaryConfig, v2 as cloudinary } from 'cloudinary';

// const cloudinary = require("cloudinary").v2;
import db from './models/db'; 

cloudinaryConfig({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

db().catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
