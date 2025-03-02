// components/CulturalProductsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard"; // Assume you have a ProductCard component

const CulturalProductsPage = () => {
  const { stateCode } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    // Fetch products based on state code
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/cultural/${stateCode || ""}`
        );
        const data = await response.json();
        setProducts(data.products);
        setSelectedState(data.state);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [stateCode]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedState
          ? `${selectedState.name} Products`
          : "All Cultural Products"}
      </h1>

      {!stateCode ? (
        // Show all states with sample products
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <div key={state.code} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{state.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                {products
                  .filter((p) => p.state === state.code)
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
              <Link
                to={`/cultural-products/${state.code}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                View all {state.name} products →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // Show filtered products for specific state
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CulturalProductsPage;
