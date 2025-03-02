// Home.jsx
import { FeaturedItems } from "../featuredItems";
import { Hero } from "../Hero";
import { PromoCards } from "../PromoCards";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="space-y-8">
          {/* Full width sections for larger screens */}
          <div className="w-full">
            <div className="max-w-[2000px] mx-auto">
              <Hero />
            </div>
          </div>

          {/* Container sections */}
          <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
            <PromoCards />
          </div>

          <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
            <FeaturedItems />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
