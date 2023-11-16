import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import diaryController from './controllers/diaryController';
import tagController from './controllers/tagController';
//TODO: Change controller names
//Diary
router.get('/diary/entries', diaryController.getAllDiaryEntries);
router.get('/diary/entries/:id', diaryController.getDiaryEntryById);
router.post('/diary/entries', diaryController.postDiaryEntry);
router.put('/diary/entries/:id', diaryController.putDiaryEntry); //INFO: edits the diary entry
router.delete('/diary/entries/:id', diaryController.deleteDiaryEntry);
router.get('/diary/entries/recent', diaryController.getRecentDiaryEntries);
//Tags
router.get('/diary/tags', tagController.getAllTags);
router.post('/diary/tags', tagController.postTag);
router.delete('/diary/tags/:id', tagController.deleteTag);
//Date
router.get('/diary/entries/:date', diaryController.getDiaryEntryByDate);
//Image
router.post('/diary/image/upload', upload.single('image'), diaryController.uploadImage);
//TODO: Add user => router.post('/user/login', ...)
export default router;
