var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Tag = require("../models/tag");
function getAllTags(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Fetching tags...");
            const allTags = yield Tag.find();
            console.log("Tags fetched:", allTags);
            res.status(200).json(allTags);
        }
        catch (error) {
            console.error("Error fetching tags:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function postTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const newTag = new Tag({ name });
            yield newTag.save();
            res.status(201).json(newTag);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function deleteTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedTag = yield Tag.findByIdAndDelete(id);
            if (!deletedTag) {
                return res.status(404).json({ message: "Tag not found" });
            }
            res.status(200).json({ message: "Tag deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
export default module.exports = { getAllTags, postTag, deleteTag };
