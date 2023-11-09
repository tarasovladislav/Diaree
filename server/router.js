const { Router } = require("express");
const router = Router();

const {
  getRecentDiaryEntries,
  getAllDiaryEntries,
  getOneDiaryEntry,
  addDiaryEntry,
  editDiaryEntry,
  deleteDiaryEntry,
} = require("./controllers/diaryController");

router.get("/recent", getRecentDiaryEntries);
router.get("/all", getAllDiaryEntries);
router.get("/:id", getOneDiaryEntry);
router.post("/add", addDiaryEntry);
router.put("/edit/:id", editDiaryEntry);
router.delete("/delete/:id", deleteDiaryEntry);

module.exports = router;
