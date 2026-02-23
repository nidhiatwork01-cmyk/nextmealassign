import { useState } from "react";

const categories = [
  "All", "Italian", "Japanese", "American", "Mediterranean", "French", "Indian", "Mexican", "Thai"
];

const CategoryFilter = () => {
  const [active, setActive] = useState("All");

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`category-chip whitespace-nowrap ${active === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;

