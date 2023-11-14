const express = require("express");
const router = require("./router.js");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const db = require('./models/db.js')

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
