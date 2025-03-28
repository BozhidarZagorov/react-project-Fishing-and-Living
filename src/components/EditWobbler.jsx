import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseinit';
import { useAuth } from "../../ctx/FirebaseAuth"
import { useNavigate } from 'react-router'


export default function EditWobbler() {
    const { wobblerId } = useParams();
    const { user, isAuthenticated } = useAuth(); //! auth ctx
    const [wobbler, setWobbler] = useState({});
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [likes, setLikes] = useState(0);
    const [fishCount, setFishCount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user){
            navigate('/login')
            return alert('You must be logged in to edit this wobbler.');
        }

        const fetchWobbler = async () => {
            try{

            const docRef = doc(db, "catalog", wobblerId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                
                setWobbler(data);
                setTitle(data.title);
                setDetails(data.details);
                setImgUrl(data.imgUrl);
                setLikes(data.likes);
                setFishCount(data.fishCount);

                // Ensure the current user is the creator of the wobbler
                if (data.createdByUserId !== user.uid) {
                    setError('You are not the creator of this wobbler.');
                }
            } else {
                setError('Wobbler not found.');
            }
            }catch(err){
                setError('Error fetching wobbler')
            }
            finally{
                setLoading(false)
            }
        };

        fetchWobbler();
    }, [wobblerId, user, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !isAuthenticated) return alert('You must be logged in to edit this wobbler.')

        if (!title || !details) {
            setError('Title and Image URL are required.');
            return;
        }

        try {
            const docRef = doc(db, "catalog", wobblerId);

            await updateDoc(docRef, {
                title: title,
                details: details,
                imgUrl: imgUrl,
                likes: likes,
                fishCount: fishCount,
            });

            console.log('Wobbler updated successfully!');
            navigate(`/catalog/${wobblerId}`)
        } catch (e) {
            setError('Error updating wobbler: ' + e.message);
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Edit Wobbler</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Edit your wobbler</p>
                
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="sm:col-span-2">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Wobbler Title</label>
                    <div className='mt-2.5'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm/6 font-semibold text-gray-900">Wobbler Details</label>
                    <div className="mt-2.5">
                    <input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                </div>

                <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Edit Wobbler
                </button>
                </div>

                {loading && <p className="spinner mt-5"></p>}
            </div>
            </form>
        </div>
    );
}