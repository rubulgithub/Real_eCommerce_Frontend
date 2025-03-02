const promos = [
  {
    title: "Gadget Store",
    subtitle: "30% Sale",
    action: "Buy Now",
    bgColor: "bg-blue-50",
  },
  {
    title: "Bundle Package",
    subtitle: "Save 30%",
    action: "See All",
    bgColor: "bg-orange-50",
  },
  {
    title: "Valentines Offer",
    subtitle: "30% Sale",
    action: "Buy Now",
    bgColor: "bg-blue-50",
  },
  {
    title: "Relax Chair",
    subtitle: "New Arrival",
    action: "Buy Now",
    bgColor: "bg-pink-50",
  },
];

export function PromoCards() {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-4">
      {promos.map((promo) => (
        <div
          key={promo.title}
          className={`${promo.bgColor} rounded-lg p-3 xs:p-4 text-center transition-transform hover:scale-[1.02]`}
        >
          <h3 className="text-xs xs:text-sm font-medium">{promo.title}</h3>
          <p className="text-base xs:text-lg font-bold mt-1">
            {promo.subtitle}
          </p>
          <div className="my-3 xs:my-4 h-20 xs:h-32">
            <img
              src="/placeholder.svg"
              alt={promo.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <button className="text-[#0095E5] hover:underline text-xs xs:text-sm">
            {promo.action}
          </button>
        </div>
      ))}
    </div>
  );
}
