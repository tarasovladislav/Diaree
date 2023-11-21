import React, { useEffect, useState } from 'react'
import './EditEntry.css'
import { putDiaryEntry } from '../../ApiService'
import { useDiary } from '../../Utils/diary'
import Modal from '../Modal/Modal';
import { useAuth } from '../../Utils/auth';
type Props = {}

const EditEntry = (props: Props) => {
    const { token } = useAuth();
    const { setDiaries, isEditEntry, setIsEditEntry, editableEntry, setEditableEntry } = useDiary()
    const [tagValue, setTagValue] = useState('');
    const [tags, setTags] = useState([]);
    const [tempTags, setTempTags] = useState([])


    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: '',
        text: '',
    })

    useEffect(() => {
        if (editableEntry) {
            const extractedTitles = editableEntry.tags.map((tag) => tag.title);
            // console.log(tags)
            // setTags(extractedTitles);
            setNewDiaryEntry({title:editableEntry.title, text: editableEntry.text})
            setTempTags(extractedTitles)
        }

    }, [editableEntry])

    console.log(tempTags)
    // console.log(tags, 'TAGS')
    // console.log(editableEntry, 'editable entry')
    const handleTagChange = (e) => {
        setTagValue(e.target.value);
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (tagValue.trim() !== '') {
                setTempTags([...tempTags, tagValue.trim()]);
                setTagValue('');
            }
        }
    };

    const removeTag = (index: number): void => {
        const newTags = [...tempTags];
        newTags.splice(index, 1);
        console.log(newTags)
        setTempTags(newTags);
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTags = tempTags.map(tag => ({ title: tag }))
        const newEntryData = {
            ...editableEntry,
            ...newDiaryEntry,
            tags: newTags
        };

        await putDiaryEntry(newEntryData, token)
            .then(data => {
                console.log(data);
                setDiaries((prevDiaries) => {
                    return prevDiaries.map((diary) => {
                        if (diary._id === editableEntry._id) {
                            console.log(diary)
                            return {
                                ...diary,
                                ...newEntryData
                            }
                        } else {
                            return diary
                        }
                    })

                });
                setIsEditEntry(false);
                // setTags([]);
            })

    }
    return (



        isEditEntry && <Modal onClose={() => setIsEditEntry(false)}>
            <div className="Title">
                <h2>Editing Entry</h2>
            </div>
            <div className="Information">
                <form onSubmit={handleSubmit}>
                    <div className="Information-Item">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' placeholder='Enter a title' required={true} defaultValue={editableEntry.title} onChange={(e) =>
                            setNewDiaryEntry({
                                ...newDiaryEntry,
                                title: e.target.value,
                            })
                        } />
                    </div>
                    <div className="Information-Item">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" cols={35} rows={7} placeholder='Enter a description' required={true} defaultValue={editableEntry.text} onChange={(e) =>
                            setNewDiaryEntry({
                                ...newDiaryEntry,
                                text: e.target.value,
                            })
                        } />
                    </div>

                    <div className="Information-Item">
                        <input
                            type="text"
                            placeholder="Enter tags"
                            value={tagValue}
                            onChange={handleTagChange}
                            onKeyDown={handleTagKeyPress}
                        />
                        <div className="tags">
                            {tempTags.map((tag, index) => (
                                <div key={index} className="tag">
                                    {tag}
                                    <button onClick={() => removeTag(index)}>X</button>
                                </div>
                            ))}
                        </div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>

        </Modal>





    )
}

export default EditEntry