"use strict";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Diary = require("../models/diary");

async function getAllDiaryEntries(req, res) {
  try {
    const allDiaryEntries = await Diary.find();
    res.status(200).json(allDiaryEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getRecentDiaryEntries(req, res) {
  try {
    const recentDiaryEntries = await Diary.find({}).sort({ date: -1 }).limit(3);

    res.status(200).json(recentDiaryEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOneDiaryEntry(req, res) {
  try {
    const { id } = req.params;
    const oneDiaryEntry = await Diary.findById(id);

    if (!oneDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.status(200).json(oneDiaryEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDiaryEntryByDate(req, res) {
  try {
    const { date } = req.params;
    const foundDiaryEntry = await Diary.findOne({ date }).exec();

    if (!foundDiaryEntry) {
      return res
        .status(404)
        .json({ message: "No diary entry found for the date" });
    }

    res.status(200).json(foundDiaryEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addDiaryEntry(req, res) {
  try {
    const { title, text, date, imageUrl, tags } = req.body;

    const diaryEntryToAdd = await Diary.create({
      title,
      text,
      date,
      imageUrl,
      tags,
    });

    res.status(201).json(diaryEntryToAdd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(req, res) {
  try {
    console.log("Received image upload request");

    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      width: 500,
      height: 500,
      crop: "fit",
      gravity: "center",
      quality: "auto",
      fetch_format: "auto",
    });

    const imageUrl = result.url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
}

async function editDiaryEntry(req, res) {
  try {
    const { id } = req.params;
    const { title, text, date, imageUrl, tags } = req.body; // Include tags

    const updatedDiaryEntry = await Diary.findByIdAndUpdate(
      id,
      {
        title,
        text,
        date,
        imageUrl,
        tags,
      },
      {
        new: true,
      }
    );

    if (!updatedDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.status(200).json(updatedDiaryEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteDiaryEntry(req, res) {
  try {
    const { id } = req.params;
    const deletedEntry = await Diary.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.status(200).json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllDiaryEntries,
  getRecentDiaryEntries,
  getOneDiaryEntry,
  getDiaryEntryByDate,
  addDiaryEntry,
  uploadImage,
  editDiaryEntry,
  deleteDiaryEntry,
};
