import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../../config/firebaseinit'
import { useAuth } from '../../ctx/FirebaseAuth'

import { CheckIcon } from '@heroicons/react/20/solid'
import { UserIcon } from '@heroicons/react/24/solid';

const tiers = [
    {
        name: 'Apartment 2',
        id: 'apartment2',
        href: '/apartments/apartment2',
        priceMonthly: '50',
        description: "The perfect apartment for your stay",
        features: [
            'Up to 3 people',
            '3 single-size bed',
            'Kitchenette',
            'Terrace',
            'Seperate bathroom',
            'Access to the barbeque',
            'Access to the fitness',
        ],
        featured: false,
    },
    {
        name: 'Apartment 1',
        id: 'apartment1',
        href: '/apartments/apartment1',
        priceMonthly: '50',
        description: "The perfect apartment for your stay",
        features: [
            'Up to 4 people',
            '1 Queen-size bed',
            '2 single-size bed',
            'Kitchenette',
            'Terrace',
            'TV in each room',
            'Seperate bathroom',
            'Access to the barbeque',
            'Access to the fitness',
        ],
        featured: true,
    },
]

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
            <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
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
                            apartment.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
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
                            <span className={classNames(apartment.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>
                                leva<UserIcon className="inline-block w-5 h-5 text-gray-500 ml-1" /> / day
                            </span>
                        </p>
                        <p className={classNames(apartment.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                            {apartment.description}
                        </p>
                        <ul
                            role="list"
                            className={classNames(
                                apartment.featured ? 'text-gray-300' : 'text-gray-600',
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
