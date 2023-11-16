const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

export default module.exports = Tag;
