import { useEffect, useState } from 'react'
import './EditEntry.css'
import { putDiaryEntry } from '../../ApiService'
import { useDiary } from '../../Utils/diary'
import Modal from '../Modal/Modal';
import { useAuth } from '../../Utils/auth';
import { DiaryType } from '../../Types/Types';

type Props = {}

const EditEntry = (props: Props) => {
    const { token } = useAuth();
    const { setDiaries, isEditEntry, setIsEditEntry, editableEntry } = useDiary();
    const [tagValue, setTagValue] = useState<string>('');
    const [tempTags, setTempTags] = useState<string[]>([]);

    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: '',
        text: '',
    })

    useEffect(() => {
        if (editableEntry) {
            const extractedTitles = editableEntry.tags.map((tag) => tag.title);
            setNewDiaryEntry({ title: editableEntry.title, text: editableEntry.text })
            setTempTags(extractedTitles)
        }

    }, [editableEntry])

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTagValue(e.target.value);
    };

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (tagValue.trim() !== '') {
                setTempTags([...tempTags, tagValue.trim()]);
                setTagValue('');
            }
        }
    };

    const removeTag = (index: number): void => {
        const newTags2 = [...tempTags];
        newTags2.splice(index, 1);
        setTempTags(newTags2);
    };


    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const newTags = Array.from(new Set(tempTags)).map(tag => ({ title: tag, }));
        if (editableEntry && editableEntry.date) {

            const newEntryData: DiaryType = {
                ...editableEntry,
                ...newDiaryEntry,
                tags: [...newTags]
            };

            token && await putDiaryEntry(newEntryData, token)
                .then(data => {
                    setDiaries((prevDiaries) => {
                        return prevDiaries.map((diary) => {
                            if (editableEntry && diary._id === editableEntry._id) {
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
                })
        }
    }
    return (

        isEditEntry && editableEntry && <Modal onClose={() => setIsEditEntry(false)}>
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
                                <div key={index} className="TagBox-Item" onClick={() => removeTag(index)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <button id="saveChanges" type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default EditEntry