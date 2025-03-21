import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseinit';
import { useAuth } from '../../ctx/FirebaseAuth';
import { useNavigate } from 'react-router'


export default function CreateWobbler() {
    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [likes, setLikes] = useState(0);
    const [fishCount, setFishCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useAuth(); //! auth ctx

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !imgUrl) {
            setError('Title and Image URL are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Add a new wobbler document to the "catalog" collection
            const docRef = await addDoc(collection(db, "catalog"), {
                title: title,
                imgUrl: imgUrl,
                likes: likes,
                fishCount: fishCount,
                likedByUserId: [], // Initialize with an empty array for tracking likes
                createdByUserId: user.uid
            });

            console.log("Document written with ID: ", docRef.id);
            navigate('/catalog'); 
            // Clear form after submission
            // setTitle('');
            // setImgUrl('');
            // setLikes(0);
            // setFishCount(0);
        } catch (e) {
            setError('Error adding wobbler: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
        </div>
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Add Wobbler</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Add your wobbler to the catalog</p>
        </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="sm:col-span-2">

                <div> 
                    <label htmlFor="title" className="block text-sm/6 font-semibold text-gray-900">Title</label>
                    <div className='mt-2.5'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        required
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="imgUrl" className="block text-sm/6 font-semibold text-gray-900">Image URL</label>
                    <div className="mt-2.5">
                    <input
                        type="url"
                        id="imgUrl"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        required
                    />
                    </div>
                </div>
                <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Wobbler'}
                </button>
                </div>
                {loading && <p className="spinner mt-5"></p>}
            </div>
            </form>
        </div>
    );
}
