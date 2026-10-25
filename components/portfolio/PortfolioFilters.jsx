"use client";

export default function PortfolioFilters({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 border-y border-[#D8D2C7]/60">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium focus:outline-none focus:ring-0 focus-visible:outline-none ${
              isActive
                ? "bg-[#242421] text-[#FAF9F6] shadow-xs"
                : "bg-transparent text-[#5E5D57] hover:text-[#242421] hover:bg-[#FAF9F6]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
