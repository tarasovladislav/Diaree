const Tag = require("../models/tag");

async function getAllTags(req, res) {
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

async function postTag(req, res) {
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

async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const deletedTag = await Tag.findByIdAndDelete(id);

        if (!deletedTag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default module.exports = { getAllTags, postTag, deleteTag };