import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseinit';
import { useAuth } from '../../ctx/FirebaseAuth';
import { useNavigate } from 'react-router'


export default function CreateWobbler() {
    const [title, setTitle] = useState('');
    // const [imgUrl, setImgUrl] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [details, setDetails] = useState('');
    const [likes, setLikes] = useState(0);
    const [fishCount, setFishCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useAuth(); //! auth ctx

    const navigate = useNavigate();

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'getUrls');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dbleq6bwe/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Get the uploaded image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Image upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !imgFile) {
            setError('Title and Image are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const imgUrl = await uploadImageToCloudinary(imgFile)
            // Add a new wobbler document to the "catalog" collection
            const docRef = await addDoc(collection(db, "catalog"), {
                title: title,
                imgUrl: imgUrl,
                details: details,
                likes: likes,
                fishCount: fishCount,
                likedByUserId: [], // Initialize with an empty array for tracking likes
                createdByUserId: user.uid
            });

            // console.log("Document written with ID: ", docRef.id);
            navigate('/catalog'); 
            // Clear form after submission
            // setTitle('');
            // setImgUrl('');
            // setLikes(0);
            // setFishCount(0);
        } catch (err) {
            setError('Error adding wobbler: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="Wobblerground-container">
        <div className="mx-auto max-w-2xl text-center mt-20">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Add Wobbler</h2>
            <p className="mt-3 text-lg/5 font-semibold text-white sm:text-3xl">Add your wobbler to the catalog</p>
        </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">

            <div className="sm:col-span-2">
                <div> 
                    <label htmlFor="title" className="block text-sm/6 font-semibold text-center text-white sm:text-2xl">Wobbler Name</label>
                    <div className='mt-2.5'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 opacity-80"
                        required
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm/6 font-semibold text-center text-white sm:text-2xl">Wobbler Image</label>
                    <div className="mt-2.5">
                    <input
                        type="file"
                        accept='image/*'
                        id="imgFile"
                        // value={imgUrl}
                        onChange={(e) => setImgFile(e.target.files[0])}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 opacity-80"
                        required
                    />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="details" className="block text-sm/6 font-semibold text-center text-white sm:text-2xl">Wobbler Details</label>
                    <div className="mt-2.5">
                    <input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 opacity-80"
                        required
                    />
                    </div>
                </div>

                <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full btn-orange"
                    disabled={loading}
                >
                    {loading ? 'Adding Wobbler...' : 'Add Wobbler'}
                </button>
                {loading ? 
                        <span className="flex justify-center mt-5">
                            <svg className="spinner"></svg>
                        </span> 
                    : null }
                </div> 
            </div>
            </form>
        </div>
    )
}
