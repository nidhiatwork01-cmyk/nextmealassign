import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import RestaurantGrid from "@/components/RestaurantGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryFilter />
        <RestaurantGrid />
      </main>
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold text-primary">Savora</span>
          <p className="text-sm text-muted-foreground">© 2026 Savora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

