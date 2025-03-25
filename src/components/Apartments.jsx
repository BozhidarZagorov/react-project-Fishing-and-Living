import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../../config/firebaseinit'
import { useAuth } from '../../ctx/FirebaseAuth'

import { CheckIcon } from '@heroicons/react/20/solid'
import { UserIcon } from '@heroicons/react/24/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Apartments() {
    const [apartments, setApartments] = useState({})
    const [loading, setLoading] = useState(true)
    const { user, isAuthenticated } = useAuth(); //! auth ctx


    useEffect(() => {

        const fetchApartment = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "apartments"));
                const apartmentList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setApartments(apartmentList);
        }catch(error){
            console.error('Error fetching apartment:', error)
        }
            setLoading(false);
        };
        fetchApartment();
    }, []);

    if (loading) return <p>Loading...</p>;// add proper loading

    return (
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <>
            {/* Background image */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 transform-gpu overflow-hidden">
                    <div
                        style={{
                            backgroundImage: 'url(/apartments.png)',  // Replace with your image URL
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '100%',  // Make it cover the full page height
                            opacity: 1,  // Remove blur and opacity
                        }}
                        className="absolute inset-0"
                    />
                </div>
            <div className="mx-auto max-w-4xl text-center">
                <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                    Rent an apartment
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                    For your ultimate fishing and living experience.
            </p>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                {apartments.map((apartment,idx) => (
                    <div
                        key={apartment.key}
                        className={classNames(
                            apartment.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/80 sm:mx-8 lg:mx-0',
                            apartment.featured
                                ? ''
                                : idx === 0
                                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                                    : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                            'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                        )}
                    >
                        <h3
                            id={apartment.key}
                            className={classNames(apartment.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
                        >
                            {apartment.name}
                        </h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span
                                className={classNames(
                                    apartment.featured ? 'text-white' : 'text-gray-900',
                                    'text-5xl font-semibold tracking-tight',
                                )}
                            >
                                {apartment.priceDaily}
                            </span>
                            <span className={classNames(apartment.featured ? 'text-gray-400' : 'text-white-900', 'text-base')}>
                                leva<UserIcon className="inline-block w-5 h-5 text-gray-500 ml-1" /> / day
                            </span>
                        </p>
                        <p className={classNames(apartment.featured ? 'text-gray-300' : 'text-white-900', 'mt-6 text-base/7')}>
                            {apartment.description}
                        </p>
                        <ul
                            role="list"
                            className={classNames(
                                apartment.featured ? 'text-gray-300' : 'text-white-900',
                                'mt-8 space-y-3 text-sm/6 sm:mt-10',
                            )}
                        >
                            {apartment.features.map((feature,index) => (
                                <li key={index} className="flex gap-x-3">
                                    <CheckIcon
                                        aria-hidden="true"
                                        className={classNames(apartment.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to={apartment.href}
                            className={classNames(
                                apartment.featured
                                    ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
                                    : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600',
                                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                            )}
                        >
                            View apartment details
                        </Link>
                    </div>
                ))}
            </div>
        </>
        </div>
    );
}
