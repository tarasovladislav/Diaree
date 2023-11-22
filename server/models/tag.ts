import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    // unique: true,
  },
});

// const Tag = mongoose.model("Tag", tagSchema);

// export default Tag;
export {tagSchema}
