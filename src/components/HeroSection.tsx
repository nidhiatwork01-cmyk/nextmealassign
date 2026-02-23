import { Search } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-food.jpg";

const HeroSection = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Elegant dining spread with gourmet dishes"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-6 pb-20">
        <div className="max-w-2xl">
          <h1
            className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-up"
          >
            Find your next
            <br />
            <span className="italic text-gold">favorite table</span>
          </h1>
          <p
            className="text-lg text-primary-foreground/70 font-body mb-8 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Discover curated restaurants, hidden gems, and unforgettable dining experiences in your city.
          </p>
          <div
            className="flex items-center bg-background/95 backdrop-blur-sm rounded-full p-1.5 max-w-lg shadow-lg animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Search className="w-5 h-5 text-muted-foreground ml-4" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body text-sm"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

