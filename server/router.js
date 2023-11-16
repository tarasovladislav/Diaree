const { Router } = require("express");
const router = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//TODO refactor router 
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

const {
  getAllTags,
  addTag,
  deleteTag,
} = require("./controllers/tagController");

router.get("/all", getAllDiaryEntries);
router.get("/recent", getRecentDiaryEntries);
router.get("/tags", getAllTags);
router.post("/tags", addTag);
router.delete("/tags/:id", deleteTag);
router.get("/date/:date", getDiaryEntryByDate);
router.post("/add", addDiaryEntry);
router.post("/upload-image", upload.single("image"), uploadImage);
router.put("/edit/:id", editDiaryEntry);
router.delete("/delete/:id", deleteDiaryEntry);
router.get("/:id", getOneDiaryEntry);


//TEST
module.exports = router;
