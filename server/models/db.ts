import mongoose from "mongoose";

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/diary");
    console.log("Connected to db ✅");
}

export default  main;
