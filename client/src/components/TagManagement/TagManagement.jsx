import { useState, useEffect } from "react";
import { getAllTags, postTag, deleteTag } from "../../ApiService";
import Tag from "../Tag/Tag";
import "./TagManagement.css";

function TagManagement({ tags, setTags }) {
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const myTags = await getAllTags();
      setTags(myTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      const addedTag = await postTag(newTagName);
      setTags([...tags, addedTag]);
      setNewTagName("");
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    try {
      await deleteTag(tagToDelete._id);
      setTags(tags.filter((tag) => tag._id !== tagToDelete._id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="tag-management-container">
      <div className="tag-list-container">
        <div className="tag-management-input">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <button onClick={handleAddTag}>Add Tag</button>
        </div>
        {tags.map((tag) => (
          <Tag key={tag._id} tag={tag} onDelete={handleDeleteTag} />
        ))}
      </div>
    </div>
  );
}

export default TagManagement;
