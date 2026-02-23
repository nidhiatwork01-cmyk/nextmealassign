import { Star, Clock, MapPin } from "lucide-react";
import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import restaurant4 from "@/assets/restaurant-4.jpg";
import restaurant5 from "@/assets/restaurant-5.jpg";
import restaurant6 from "@/assets/restaurant-6.jpg";

const restaurants = [
  {
    name: "Trattoria Bellissima",
    cuisine: "Italian",
    rating: 4.8,
    price: "$$$",
    time: "25-35 min",
    location: "West Village",
    image: restaurant1,
  },
  {
    name: "Omakase Sora",
    cuisine: "Japanese",
    rating: 4.9,
    price: "$$$$",
    time: "40-50 min",
    location: "Tribeca",
    image: restaurant2,
  },
  {
    name: "The Patty Bureau",
    cuisine: "American",
    rating: 4.6,
    price: "$$",
    time: "15-25 min",
    location: "Brooklyn",
    image: restaurant3,
  },
  {
    name: "Olive & Vine",
    cuisine: "Mediterranean",
    rating: 4.7,
    price: "$$$",
    time: "30-40 min",
    location: "SoHo",
    image: restaurant4,
  },
  {
    name: "Maison Lumière",
    cuisine: "French",
    rating: 4.9,
    price: "$$$$",
    time: "45-60 min",
    location: "Upper East Side",
    image: restaurant5,
  },
  {
    name: "Saffron Palace",
    cuisine: "Indian",
    rating: 4.5,
    price: "$$",
    time: "20-30 min",
    location: "East Village",
    image: restaurant6,
  },
];

const RestaurantGrid = () => {
  return (
    <section className="container mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured Restaurants
          </h2>
          <p className="text-muted-foreground mt-2 font-body">
            Hand-picked spots our editors love
          </p>
        </div>
        <a href="#" className="text-sm font-medium text-primary hover:underline hidden sm:block">
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <article key={r.name} className="card-hover group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                {r.price}
              </div>
            </div>
            <div className="pt-4 pb-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {r.name}
                </h3>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-foreground">{r.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{r.cuisine}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {r.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {r.location}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RestaurantGrid;

