"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_js_1 = __importDefault(require("../models/tag.js"));
async function getAllTags(req, res) {
    try {
        console.log("Fetching tags...");
        const allTags = await tag_js_1.default.find();
        console.log("Tags fetched:", allTags);
        res.status(200).json(allTags);
    }
    catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function postTag(req, res) {
    try {
        const { name } = req.body;
        const newTag = new tag_js_1.default({ name });
        await newTag.save();
        res.status(201).json(newTag);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const deletedTag = await tag_js_1.default.findByIdAndDelete(id);
        if (!deletedTag) {
            res.status(404).json({ message: "Tag not found" });
        }
        res.status(200).json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.default = { getAllTags, postTag, deleteTag };
