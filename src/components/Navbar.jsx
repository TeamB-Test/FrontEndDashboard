import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-2 bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-primary animate-fade-in">
          TableTapster
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            <Link
              to="/"
              className={cn(
                "transition-colors hover:text-primary",
                location.pathname === "/" && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={cn(
                "transition-colors hover:text-primary",
                location.pathname === "/search" && "text-primary font-medium"
              )}
            >
              Find Restaurant
            </Link>
          </div>

          <div className="space-x-4">
            {isAdminRoute ? (
              <Link to="/">
                <Button variant="outline" className="btn-hover-effect">
                  Customer View
                </Button>
              </Link>
            ) : (
              <>

              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-foreground p-2 rounded-md focus:outline-none"
        >
          {isOpen ? (
            <X className="h-6 w-6 animate-scale-in" />
          ) : (
            <Menu className="h-6 w-6 animate-scale-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg rounded-b-xl mx-4 mt-2 animate-slide-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className={cn(
                "p-2 rounded-md transition-colors hover:bg-accent",
                location.pathname === "/" && "bg-accent text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={cn(
                "p-2 rounded-md transition-colors hover:bg-accent",
                location.pathname === "/search" && "bg-accent text-primary font-medium"
              )}
            >
              Find Restaurant
            </Link>

            <div className="pt-2 flex flex-col space-y-2">
              {isAdminRoute ? (
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Customer View
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/admin/login">
                    <Button variant="outline" className="w-full">
                      Admin Login
                    </Button>
                  </Link>
                  <Link to="/admin/register">
                    <Button variant="default" className="w-full">
                      Become a Member
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
