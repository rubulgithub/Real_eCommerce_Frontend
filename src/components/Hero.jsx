import React from "react";

export function Hero() {
  return (
    <div className="w-full">
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <div className="grid md:grid-cols-2 gap-4 p-4 xs:p-6 items-center">
            {/* Text Content */}
            <div className="space-y-2 xs:space-y-4 order-2 md:order-1">
              <p className="text-base xs:text-lg md:text-xl">
                Up to <span className="text-[#0095E5]">70%</span> off on Black
                Friday
              </p>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                TRENDY <span className="text-[#0095E5]">FASHION</span>
                <br />
                COLLECTION
              </h1>
              <button className="bg-[#0095E5] text-white px-4 xs:px-6 py-1.5 xs:py-2 rounded-md hover:bg-[#0084CC] transition-colors text-sm xs:text-base">
                Buy Now
              </button>
            </div>

            {/* Image Section */}
            <div className="order-1 md:order-2 relative h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loosing-TqdtbWOQbv0yFEi7po95Rd4JhWgfNx.webp"
                alt="Fashion collection promotion"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Optional overlay for darker images */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// Optional types if using TypeScript
// interface HeroProps {
//   bannerImage?: string;
//   discount?: string;
//   title?: string;
//   subtitle?: string;
// }
