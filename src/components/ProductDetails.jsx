import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseinit'

import { StarIcon } from '@heroicons/react/20/solid'

export default function ProductDetails () {
    const { wobblerId } = useParams();
    const [wobbler, setWobbler] = useState({});
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading...</p>;// add proper loading

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{wobbler.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Wobbler information</h2>

                        <img
                            alt={wobbler.title}
                            src={wobbler.imgUrl}
                            className="aspect-4/5 object-cover sm:rounded-lg lg:aspect-auto"
                        />

                        {/* <p className="text-3xl tracking-tight text-gray-900">{wobbler.likes}</p> */}

                        {/* Reviews */}
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
                            >
                                Add to bag
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                        {/* Description */}
                        {/* <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{wobbler.description || 'No description available.'}</p>
                            </div>
                        </div> */}

                        {/* Highlights */}
                        <div className="mt-10">
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
                        </div>

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
        </div>
    )
}
