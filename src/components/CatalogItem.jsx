import { Link } from "react-router";

export default function CatalogItem({
    product,
}) {
    return (
        <Link key={product.id} to={`/catalog/${product.id}`} className="group">
            <img
                alt={product.title}
                src={product.image}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </Link>
    );
}
