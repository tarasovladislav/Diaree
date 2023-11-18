import { useState } from 'react';
import { uploadImage, postDiaryEntry } from '../../ApiService';
import './DiaryEntry.css';
import { useDiary } from '../../Utils/diary';

const DiaryEntry = () => {
    const [isUploading, setIsUploading] = useState(false);
    const { selectedDate, setDiaries, isAddNewEvent, setIsAddNewEvent } = useDiary()
    const [tagValue, setTagValue] = useState('');
    const [tags, setTags] = useState([]);

    const handleInputChange = (e) => {
        setTagValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (tagValue.trim() !== '') {
                setTags([...tags, tagValue.trim()]);
                setTagValue('');
            }
        }
    };

    const removeTag = (index: number): void => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: "",
        text: "",
        imageUrl: "",
        tags: [],
    })

    const handleUploadImage = async (e: any) => {
        const file = e.target.files[0];
        const form = new FormData();
        form.append('image', file);

        setIsUploading(true);

        // const uploadedImage = await uploadImage(form);
        await fetch(`http://localhost:3000/diary/image/upload`, {
            method: "POST",
            body: form,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Image upload failed: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setIsUploading(false);
                setNewDiaryEntry({ ...newDiaryEntry, imageUrl: data.imageUrl });
            })
    }

    const createDiaryEntry = async () => {
        console.log('Event triggered: Create diary entry; DiaryEntry.tsx');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTags = tags.map(tag => ({ title: tag }))
        const newEntryData = {
            ...newDiaryEntry,
            date: selectedDate,
            tags: newTags
            // tags: selectedTags.map((tag) => tag.name),
        };

        postDiaryEntry(newEntryData)
            .then(data => {
                setDiaries((prevDiaries) => [data, ...prevDiaries]);
                setIsAddNewEvent(false);
                setTags([]);
            })

    }




    //trying









    return (
        isAddNewEvent && (<div className="DiaryEntry">
            <div className="Modal-Overlay">
                <button className="Close" onClick={() => setIsAddNewEvent(false)}>Close</button>
                <div className="Modal" onSubmit={createDiaryEntry}>
                    <div className="Title">
                        <h2>Create a new diary entry</h2>
                    </div>
                    <div className="Information">
                        <form onSubmit={handleSubmit}>
                            <div className="Information-Item">
                                <label htmlFor="title">Title</label>
                                <input type="text" name='title' placeholder='Enter a title' required={true} onChange={(e) =>
                                    setNewDiaryEntry({
                                        ...newDiaryEntry,
                                        title: e.target.value,
                                    })
                                } />
                            </div>
                            <div className="Information-Item">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" cols={35} rows={7} placeholder='Enter a description' required={true} onChange={(e) =>
                                    setNewDiaryEntry({
                                        ...newDiaryEntry,
                                        text: e.target.value,
                                    })
                                } />
                            </div>



                            {/* <div className="Information-Item">
                                <label htmlFor="tags">Tags</label>
                                <input name="description" placeholder='Enter tags' onChange={(e) =>
                                    setNewDiaryEntry({
                                        ...newDiaryEntry,
                                        text: e.target.value,
                                    })
                                } />
                            </div> */}


                            <div className="Information-Item">
                                <input
                                    type="text"
                                    placeholder="Enter tags"
                                    value={tagValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleInputKeyPress}
                                />
                                <div className="tags">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="tag">
                                            {tag}
                                            <button onClick={() => removeTag(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            <div className="Information-Item">
                                <label htmlFor="image"></label>
                                <input type="file" accept='image/*' disabled={isUploading} onChange={handleUploadImage} />
                                <button type='submit' disabled={isUploading} >
                                    {isUploading ? 'Uploading...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    )
}

export default DiaryEntry