import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { collection, getDocs } from "firebase/firestore";
import { db } from "/public/config/firebaseinit";
import { useAuth } from '/public/ctx/FirebaseAuth'
import { useNavigate } from "react-router"

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import CatalogItem from "./CatalogItem"
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'All', href: '/catalog', current: true },
    { name: 'Most Liked', href: '/catalog?sortBy=likes&dir=desc', current: false },
    { name: 'Most Caught Fishes', href: '/catalog?sortBy=fishCount&dir=desc', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Catalog() {
    const [searchParams] = useSearchParams();
    const [wobblers, setWobblers] = useState([]);
    const [displayWobblers, setDisplayWobblers] = useState([]);

    const { user, isAuthenticated } = useAuth(); //! auth ctx

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWobblers = async () => {
            const querySnapshot = await getDocs(collection(db, "catalog")); // Fetch from "wobblers" firebase db
            const wobblerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setWobblers(wobblerList);
        };

        fetchWobblers();
    }, []);

    useEffect(() => {
        const filter = Object.fromEntries(searchParams);

        if (filter.sortBy) {
            setDisplayWobblers([...wobblers].sort((w1, w2) =>
                filter.dir === 'asc' ? w1[filter.sortBy] - w2[filter.sortBy] : w2[filter.sortBy] - w1[filter.sortBy]))
        } else {
            setDisplayWobblers([...wobblers]);
        }
    }, [wobblers, searchParams])

    const handleAddWobblerBtn = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return alert('You must be logged in to add wobblers.');
        } else {
            navigate("/catalog/addWobbler");
        }
    }

    return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Wobblers</h2>

                <div className="flex justify-center px-6 py-8 lg:px-8">
                    <div className="flex gap-x-12">
                        <button onClick={handleAddWobblerBtn} className="btn-orange">
                            Add Wobbler
                        </button>
                    </div>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                            />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <div className="py-1">
                            {sortOptions.map((option) => (
                                <MenuItem key={option.name}>
                                    <Link
                                        to={option.href}
                                        className={classNames(
                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                                        )}
                                    >
                                        {option.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {displayWobblers.map((wobbler) => (
                        <CatalogItem key={wobbler.id} wobbler={wobbler} />
                    ))}
                </div>
            </div>
    )
}
