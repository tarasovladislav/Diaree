"use strict";
//TODO remove unused libraries redundant
import multer from 'multer'
const upload = multer({ dest: "uploads/" });
import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import { Request, Response } from 'express';

import Diary from "../models/diary.js"
import { validateUser } from '../utils/userUtils.js';
import User from '../models/user.js';


async function getAllDiaryEntries(req: Request, res: Response): Promise<any> {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { user } = validatedUser;
        res.status(200).json(user.diary_entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRecentDiaryEntries(req: Request, res: Response): Promise<any> {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });

        const recentDiaryEntries = await Diary.find({}).sort({ date: -1 }).limit(3);

        res.status(200).json(recentDiaryEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getDiaryEntryById(req: Request, res: Response): Promise<any> {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { id } = req.params;
        const oneDiaryEntry = await Diary.findById(id);

        if (!oneDiaryEntry) {
            res.status(404).json({ message: "Diary entry not found" });
        }

        res.status(200).json(oneDiaryEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//change to get all
async function getDiaryEntryByDate(req: Request, res: Response): Promise<any> {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { date } = req.params;
        console.log(req.params)
        // console.log(date)
        const foundDiaryEntry = await Diary.find({ date });
        // console.log(foundDiaryEntry)

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
// async function getDiaryEntryByDate(req: Request, res: Response) {
//     try {
//         const { date } = req.params;
//         const foundDiaryEntry = await Diary.findOne({ date }).exec();

//         if (!foundDiaryEntry) {
//             return res
//                 .status(404)
//                 .json({ message: "No diary entry found for the date" });
//         }

//         res.status(200).json(foundDiaryEntry);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

async function postDiaryEntry(req: Request, res: Response): Promise<any> {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { title, text, date, imageUrl, tags } = req.body;
        const { user_id } = validatedUser;

        const updatedUser = await User.findOneAndUpdate(
            { user_id },
            {
                $push: {
                    diary_entries: {
                        title,
                        text,
                        date,
                        imageUrl,
                        tags
                    }
                }
            },
            { new: true } // To get the updated user data
        );
        const pushedDiaryEntry = updatedUser?.diary_entries[updatedUser.diary_entries.length - 1];
        res.status(201).json(pushedDiaryEntry);
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

async function uploadImage(req: Request, res: Response): Promise<void> {
    try {
        console.log("Received image upload request");
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
                quality: "auto",
                fetch_format: "auto",
            })
            const imageUrl = result.url;
            res.json({ imageUrl });
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
}

async function putDiaryEntry(req: Request, res: Response): Promise<void> {
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
            res.status(404).json({ message: "Diary entry not found" });
        }

        res.status(200).json(updatedDiaryEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteDiaryEntry(req: Request, res: Response): Promise<any> {
    try {

        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { id } = req.params;
        const userId = validatedUser.user_id
        console.log(id)
        const updatedUser = await User.findOneAndUpdate(
            { user_id: userId },
            {
                $pull: {
                    diary_entries: { _id: id }
                }
            },
            { new: true } // To get the updated user data
        );

        if (!updatedUser) {
            res.status(404).json({ message: "Diary entry not found" });
            return
        }

        res.status(200).json({ message: "Diary entry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default {
    getAllDiaryEntries,
    getRecentDiaryEntries,
    getDiaryEntryById,
    getDiaryEntryByDate,
    postDiaryEntry,
    uploadImage,
    putDiaryEntry,
    deleteDiaryEntry,
};
