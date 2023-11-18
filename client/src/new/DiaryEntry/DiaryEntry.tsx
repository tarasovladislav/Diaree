import { useState } from 'react';
import { uploadImage } from '../../ApiService';
import './DiaryEntry.css';

const DiaryEntry = () => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadImage = async (e: any) => {
        const file = e.target.files[0];
        const form = new FormData();
        form.append('image', file);

        setIsUploading(true);

        const uploadedImage = await uploadImage(form);

        if (uploadedImage) {
            setIsUploading(false);
            //Create Entry
        }
    }

    const createDiaryEntry = async () => {
        console.log('Event triggered: Create diary entry; DiaryEntry.tsx');   
    }

    return (
        <div className="DiaryEntry">
            <div className="Modal-Overlay">
                <button className="Close" title="Close Modal">
                    &times;
                </button>
                <div className="Modal" onSubmit={createDiaryEntry}>
                    <div className="Title">
                        <h2>Create a new diary entry</h2>
                    </div>
                    <div className="Information">
                        <div className="Information-Item">
                            <label htmlFor="title">Title</label>
                            <input type="text" name='title' placeholder='Enter a title' required={true} />
                        </div>
                        <div className="Information-Item">
                            <label htmlFor="description">Description</label>
                            {/* <input type="text" name='description' placeholder='Enter a title' /> */}
                            <textarea name="description" cols='35' rows="7" placeholder='Enter a description' required={true} />
                        </div>
                        <div className="Information-Item">
                            <label htmlFor="image"></label>
                            <input type="file" accept='image/*' disabled={isUploading} onChange={handleUploadImage} />
                            <button type='submit' disabled={isUploading} >
                                {isUploading ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryEntry