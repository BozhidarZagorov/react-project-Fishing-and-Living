import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { doc, getDoc} from 'firebase/firestore'
import { db } from '../../config/firebaseinit'
import { useAuth } from '../../ctx/FirebaseAuth'

export default function ApartmentDetails () {
    const { apartmentId } = useParams();
    const [apartment, setApartment] = useState({})
    const [loading, setLoading] = useState(true)
    const { user, isAuthenticated } = useAuth(); //! auth ctx


    useEffect(() => {
        const fetchApartment = async () => {
            const docRef = doc(db, "apartments", apartmentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setApartment(docSnap.data());
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        fetchApartment();
    }, [apartmentId]);

    if (loading) return <p>Loading...</p>;// add proper loading

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Wobbler info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{apartment.name}</h1>
                    </div>

                    {/* img */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Apartment information</h2>

                        <img
                            alt={apartment.name}
                            src={apartment.imgUrl}
                            className="aspect-4/5 object-cover sm:rounded-lg lg:aspect-auto"
                        />
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
                    </div>
                </div>
            </div>
        </div>
    )
}
