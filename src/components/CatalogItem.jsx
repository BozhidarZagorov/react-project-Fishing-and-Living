import { Link } from "react-router";

export default function CatalogItem({
    wobbler,
}) {
    return (
        <Link key={wobbler.id} to={`/catalog/${wobbler.id}`} className="group">
            <img
                alt={wobbler.title}
                src={wobbler.imgUrl}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <h3 className="mt-4 text-sm text-gray-700">{wobbler.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">Likes: {wobbler.likes} | Fish Caught: {wobbler.fishCount}</p>
        </Link>
    );
}
