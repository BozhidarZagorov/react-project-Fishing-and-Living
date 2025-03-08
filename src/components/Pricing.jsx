import { Link, Outlet } from 'react-router'

export default function Pricing() {
    return (
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="hidden lg:flex lg:gap-x-12">
                <Link
                    to='/pricing'
                    className="text-sm/6 font-semibold text-gray-900"
                >
                    Individual
                </Link>
                <Link
                    to='/pricing/business'
                    className="text-sm/6 font-semibold text-gray-900"
                >
                    Business
                </Link>
            </div>

            <Outlet />
        </div>
    )
}
