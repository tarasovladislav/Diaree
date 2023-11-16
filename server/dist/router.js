"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const diaryController_js_1 = __importDefault(require("./controllers/diaryController.js"));
const tagController_js_1 = __importDefault(require("./controllers/tagController.js"));
//TODO: Change controller names
//Diary
router.get('/diary/entries', diaryController_js_1.default.getAllDiaryEntries);
router.get('/diary/entries/:id', diaryController_js_1.default.getDiaryEntryById);
router.post('/diary/entries', diaryController_js_1.default.postDiaryEntry);
router.put('/diary/entries/:id', diaryController_js_1.default.putDiaryEntry); //INFO: edits the diary entry
router.delete('/diary/entries/:id', diaryController_js_1.default.deleteDiaryEntry);
router.get('/diary/entries/recent', diaryController_js_1.default.getRecentDiaryEntries);
//Tags
router.get('/diary/tags', tagController_js_1.default.getAllTags);
router.post('/diary/tags', tagController_js_1.default.postTag);
router.delete('/diary/tags/:id', tagController_js_1.default.deleteTag);
//Date
router.get('/diary/entries/:date', diaryController_js_1.default.getDiaryEntryByDate);
//Image
router.post('/diary/image/upload', upload.single('image'), diaryController_js_1.default.uploadImage);
//TODO: Add user => router.post('/user/login', ...)
exports.default = router;
