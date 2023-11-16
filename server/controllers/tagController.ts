import Tag from '../models/tag'
import { Request, Response } from 'express';



async function getAllTags(req: Request, res: Response): Promise<void> {
    try {
        console.log("Fetching tags...");
        const allTags = await Tag.find();
        console.log("Tags fetched:", allTags);
        res.status(200).json(allTags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function postTag(req: Request, res: Response): Promise<void> {
    try {
        const { name } = req.body;
        const newTag = new Tag({ name });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteTag(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const deletedTag = await Tag.findByIdAndDelete(id);

        if (!deletedTag) {
            res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default module.exports = { getAllTags, postTag, deleteTag };