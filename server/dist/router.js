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
const userController_js_1 = __importDefault(require("./controllers/userController.js"));
//Diary
router.get('/diary/entries', diaryController_js_1.default.getAllDiaryEntries);
router.post('/diary/entries', diaryController_js_1.default.postDiaryEntry);
router.put('/diary/entries/:id', diaryController_js_1.default.putDiaryEntry);
router.delete('/diary/entries/:id', diaryController_js_1.default.deleteDiaryEntry);
//Image
router.post('/diary/image/upload', upload.single('image'), diaryController_js_1.default.uploadImage);
//User
router.get('/user/account', userController_js_1.default.getUser);
router.post('/user/account/login', userController_js_1.default.postLogin);
router.post('/user/account/register', userController_js_1.default.postRegister);
router.put('/user/account/update', userController_js_1.default.putUpdate);
//Validation
router.get('/user/account/validate', userController_js_1.default.getValidateToken);
exports.default = router;
