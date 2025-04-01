
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TableTapster</h3>
            <p className="text-muted-foreground">
              Revolutionizing the dining experience by eliminating the need for waiters.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Restaurant
                </Link>
              </li>
              <li>
                <Link to="/admin/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@tabletapster.com</li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TableTapster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
