import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projects" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background/95 sticky top-0 z-50 border-b border-border/50 shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-black tracking-tight text-foreground hover:opacity-90 transition-opacity">
              RAMSIN
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-secondary/80 ${
                  location.pathname === item.path
                    ? "text-primary nav-link-active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Bascule de Mode Sombre / Clair */}
            <div className="pl-2 pr-1">
              <ThemeToggle />
            </div>

            <Button asChild size="sm" className="ml-1 gap-1.5 font-semibold animate-pulse-glow rounded-lg">
              <Link to="/contact">
                Demander un devis <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </nav>

          {/* Mobile Actions & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/80"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-2 gap-1.5" size="sm">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Demander un devis <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
