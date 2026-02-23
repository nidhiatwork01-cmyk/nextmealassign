import { Search, MapPin } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="font-display text-2xl font-bold text-primary tracking-tight">
          Savora
        </a>
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Discover</a>
          <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Cuisines</a>
          <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Near Me</a>
          <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Favorites</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>New York</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

