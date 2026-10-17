import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import RamsinLogo from "@/components/RamsinLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projets" },
    { name: "À propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 sticky top-0 z-50 border-b border-border/70 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity">
              <RamsinLogo size={34} className="group-hover:scale-105 transition-transform drop-shadow-sm" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1.5">
                  RAMSIN
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] shadow-[0_0_8px_#C7F36B]" />
                </span>
                <span className="text-[9.5px] font-bold tracking-widest text-muted-foreground uppercase hidden sm:block">
                  Architecture & Tech
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-all rounded-xl ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-2xs font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C7F36B] rounded-full" />
                  )}
                </Link>
              );
            })}

            <Button
              asChild
              size="sm"
              variant="lime"
              className="ml-3 gap-1.5 rounded-xl font-extrabold shadow-[0_2px_14px_rgba(199,243,107,0.35)] hover:shadow-[0_4px_22px_rgba(199,243,107,0.55)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Link to="/contact">
                Échanger sur votre projet <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </nav>

          {/* Mobile Actions & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="min-h-[44px] min-w-[44px] p-2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/80 focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              onClick={toggleMenu}
              aria-label="Ouvrir ou fermer le menu de navigation"
              aria-expanded={isMenuOpen}
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
              <Button asChild variant="lime" className="mt-2 gap-1.5 font-extrabold" size="sm">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Échanger sur votre projet <ArrowRight className="w-3.5 h-3.5" />
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
