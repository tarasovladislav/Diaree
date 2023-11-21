import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import diaryController from './controllers/diaryController.js';
import userController from './controllers/userController.js';

//Diary
router.get('/diary/entries', diaryController.getAllDiaryEntries);

router.post('/diary/entries', diaryController.postDiaryEntry);
router.put('/diary/entries/:id', diaryController.putDiaryEntry);
router.delete('/diary/entries/:id', diaryController.deleteDiaryEntry);

//Image
router.post('/diary/image/upload', upload.single('image'), diaryController.uploadImage);

//User
router.get('/user/account', userController.getUser);
router.post('/user/account/login', userController.postLogin);
router.post('/user/account/register', userController.postRegister);
router.put('/user/account/update', userController.putUpdate);

//Validation
router.get('/user/account/validate', userController.getValidateToken);


export default router;