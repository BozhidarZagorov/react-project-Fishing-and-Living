import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore'
import { db } from '/public/config/firebaseinit'
import { useAuth } from '/public/ctx/FirebaseAuth'
import { useNavigate } from 'react-router'

import { StarIcon } from '@heroicons/react/20/solid'

export default function ProductDetails () {
    const { wobblerId } = useParams();
    const [wobbler, setWobbler] = useState({})
    const [loading, setLoading] = useState(true)
    const [hasLiked, setHasLiked] = useState(false)
    const { user, isAuthenticated } = useAuth(); //! auth ctx

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWobbler = async () => {
            const docRef = doc(db, "catalog", wobblerId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setWobbler(docSnap.data());
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        fetchWobbler();
    }, [wobblerId]);

    useEffect(() => {
        if (isAuthenticated && user) {
            
            const checkIfLiked = () => {
                if (wobbler.likedByUserId && wobbler.likedByUserId.includes(user.uid)) {
                    setHasLiked(true);
                }
            };

            checkIfLiked();
        }
    }, [wobbler, isAuthenticated, user]);


    const handleLike = async () => {
        if (!isAuthenticated){
            navigate('/login')
            return alert('You must be logged in to like this wobbler.');
        }
        if(hasLiked) return; // Prevent like if not auth or already liked

        const docRef = doc(db, "catalog", wobblerId);
        await updateDoc(docRef, {
            likes: wobbler.likes + 1,
            likedByUserId: arrayUnion(user.uid)
        });

        setWobbler((prevState) => ({
            ...prevState,
            likes: prevState.likes + 1
        }));

        setHasLiked(true); // Set state to prevent further likes
    }

    const handleFishCount = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return alert('You must be logged in add fishes to the count.');
        }
        const docRef = doc(db, "catalog", wobblerId);
        await updateDoc(docRef, {
            fishCount: wobbler.fishCount + 1
        });
        setWobbler((prevState) => ({
            ...prevState,
            fishCount: prevState.fishCount + 1
        }));
    }

    const handleEdit = () => {
        if (isAuthenticated) {
            navigate(`/catalog/${wobblerId}/edit`);
        }else{
            navigate('/login')
            return alert('You must be logged in to edit this wobbler.')
        }
    };

    const handleDelete = async () => {
        if (!user || !isAuthenticated){
            navigate('/login')
            return alert('You must be logged in to delete this wobbler.');
        }
        if (wobbler?.createdByUserId !== user.uid) return alert('You are not authorized to delete this wobbler.');
    
        try {
            const docRef = doc(db, "catalog", wobblerId);
            await deleteDoc(docRef);
            navigate('/catalog'); // Redirect after deletion
        } catch (error) {
            setError('Error deleting wobbler: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;// add proper loading

    const isCreator = isAuthenticated && user?.uid === wobbler?.createdByUserId;

    return (
        
            <div className="pt-6">
                {/* Wobbler info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{wobbler.title}</h1>
                    </div>

                    {/* img */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Wobbler information</h2>

                        <img
                            alt={wobbler.title}
                            src={wobbler.imgUrl}
                            className="aspect-4/5 object-cover sm:rounded-lg lg:aspect-auto"
                        />

                        {/* <p className="text-3xl tracking-tight text-gray-900">{wobbler.likes}</p> */}

                        
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={`${
                                                wobbler.likes && wobbler.likes > rating ? 'text-gray-900' : 'text-gray-200'
                                            } size-5 shrink-0`}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{wobbler.likes} out of 5 stars</p>
                                <p className="ml-3 text-sm font-medium text-indigo-600">{wobbler.likes} Likes</p>
                            </div>
                        {!hasLiked && (
                            <button
                                type="button"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                onClick={handleLike}
                            >
                                Like
                            </button>
                         )}
                        </div>

                        <form className="mt-10">
                            {/* Fish count */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Fish Caught</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{wobbler.fishCount}</p>
                            </div>

                            <button
                                type="button"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                onClick={handleFishCount}
                            >
                                +1 Fish Count
                            </button>

                            {isCreator && (
                                <>
                                    <button
                                        type="button"
                                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-500 px-8 py-3 text-base font-medium text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                                        onClick={handleEdit}
                                    >
                                        Edit Wobbler
                                    </button>

                                    <button
                                        type="button"
                                        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        onClick={handleDelete}
                                    >
                                        Delete Wobbler
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        {/* Details */}
                        <div>
                            <h3 className="sr-only">Details</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{wobbler.details || 'No details available.'}</p>
                            </div>
                        </div>

                        {/* Highlights */}
                        {/* <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">Handcrafted design</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">High-quality materials</span>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                        {/* Category */}
                        {/* <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Category</h2>
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{wobbler.category || 'No category available'}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}
