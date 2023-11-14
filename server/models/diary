const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    set: (value) => {
      if (value instanceof Date) {
        value.setHours(0, 0, 0, 0);
        return value;
      }
      return value;
    },
  },
  createdAt: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000),
  },
  imageUrl: {
    type: String,
    required: false,
  },
  tags: [
    {
      type: String,
    },
  ],
});

diarySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
