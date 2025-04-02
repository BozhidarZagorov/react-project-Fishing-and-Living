import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '/public/config/firebaseinit';
import { useAuth } from "/public/ctx/FirebaseAuth"
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
        <div className="Wobblerground-container">
        <div className="mx-auto max-w-2xl text-center mt-20">
            
           
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Edit Wobbler</h2>
                <p className="mt-3 text-lg/5 font-semibold text-white sm:text-3xl">Edit your wobbler</p>
                
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="sm:col-span-2">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-center text-white sm:text-2xl">Wobbler Title</label>
                    <div className='mt-2.5'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 opacity-80"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm/6 font-semibold text-center text-white sm:text-2xl">Wobbler Details</label>
                    <div className="mt-2.5">
                    <input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 opacity-80"
                        />
                    </div>
                </div>

                <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full btn-orange"
                    >
                    {loading ? 'Editing Wobbler...' : 'Edit Wobbler'}
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
    </div>
    );
}