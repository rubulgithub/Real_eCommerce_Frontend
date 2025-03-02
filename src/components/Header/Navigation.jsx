import { Link } from "react-router-dom";
import CulturalProductsDropdown from "../CulturalProductsDropdown";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { component: <CulturalProductsDropdown /> },
  { label: "Pages", href: "/pages" },
  { label: "Campaign", href: "/campaign" },
  { label: "Offer", href: "/offer" },
  { label: "Blog", href: "/blog" },
  { label: "Review", href: "/review" },
  { label: "Flash Sale", href: "/flash-sale" },
  { label: "Contact us", href: "/contact" },
];

export default function Navigation() {
  return (
    <nav className="bg-[#0095E5] text-white">
      <div className="container px-2 xs:px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-wrap items-center gap-1 py-2">
          {navItems.map((item, index) =>
            item.component ? (
              <div key={`cultural-${index}`}>{item.component}</div>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className="px-2 xs:px-3 py-2 rounded-md hover:bg-[#0084CC] transition-colors text-sm"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide py-2">
          <div className="flex items-center gap-2 min-w-max">
            {navItems.map((item, index) =>
              item.component ? (
                <div key={`cultural-mobile-${index}`} className="relative">
                  {/* Mobile-friendly dropdown implementation */}
                  <CulturalProductsDropdown />
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2 rounded-md hover:bg-[#0084CC] transition-colors text-sm whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
