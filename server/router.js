const { Router } = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })


const {
  getRecentDiaryEntries,
  getAllDiaryEntries,
  getOneDiaryEntry,
  getDiaryEntryByDate,
  addDiaryEntry,
  uploadImage,
  editDiaryEntry,
  deleteDiaryEntry,
} = require("./controllers/diaryController");

router.get("/recent", getRecentDiaryEntries);
router.get("/all", getAllDiaryEntries);
router.get("/:id", getOneDiaryEntry);
router.get("/date/:date", getDiaryEntryByDate);
router.post("/add", addDiaryEntry);
router.post("/upload-image", upload.single("image"), uploadImage);
router.put("/edit/:id", editDiaryEntry);
router.delete("/delete/:id", deleteDiaryEntry);

module.exports = router;
