// TagManagement.jsx
import { useState, useEffect } from "react";
import { getTags, addTag, deleteTag } from "../../ApiService";
import Tag from "../Tag/Tag";

function TagManagement({tags, setTags}) {
  const [newTagName, setNewTagName] = useState("");
//   const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const myTags = await getTags();
      setTags(myTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      const addedTag = await addTag(newTagName);
      setTags([...tags, addedTag]); // Store the entire object, not just addedTag.name
      setNewTagName("");
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    try {
      await deleteTag(tagToDelete._id); // Pass the _id of the tag to deleteTag
      setTags(tags.filter((tag) => tag._id !== tagToDelete._id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <div>
        {tags.map((tag) => (
          <Tag key={tag._id} tag={tag} onDelete={handleDeleteTag} />
        ))}
      </div>
    </div>
  );
}

export default TagManagement;
