import { Star } from "lucide-react";

const FItems = [
  {
    name: "Premium Quality Black Chair",
    price: 20.0,
    originalPrice: 40.0,
    rating: 4.5,
    reviews: 35,
    discount: 50,
    image: "/placeholder.svg",
  },
  // Add more items as needed
];

export function FeaturedItems() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Featured Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FItems.map((item) => (
          <div
            key={item.name}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                -{item.discount}%
              </span>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(item.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-600">({item.reviews})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#0095E5] font-bold">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${item.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
