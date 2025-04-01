
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  List,
  Table,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMobileOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Tables",
      path: "/admin/tables",
      icon: <Table size={20} />
    },
    {
      name: "Foods",
      path: "/admin/foods",
      icon: <Utensils size={20} />
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <List size={20} />
    }
  ];

  const sidebarClasses = cn(
    "bg-sidebar text-sidebar-foreground h-screen border-r border-sidebar-border transition-all duration-300 flex flex-col fixed top-0 z-40",
    {
      "w-64": !collapsed,
      "w-16": collapsed && !isMobile,
      "w-64 transform -translate-x-full": collapsed && isMobile && !mobileOpen,
      "w-64 transform translate-x-0": collapsed && isMobile && mobileOpen
    }
  );

  const overlayClasses = cn(
    "fixed inset-0 bg-black/50 z-30 transition-opacity duration-300",
    {
      "opacity-0 pointer-events-none": !mobileOpen,
      "opacity-100": mobileOpen
    }
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground"
        >
          <Menu size={20} />
        </button>
      )}
      
      {/* Overlay for mobile */}
      <div className={overlayClasses} onClick={() => setMobileOpen(false)} />
      
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/admin/dashboard" className={cn("font-semibold text-xl transition-opacity duration-300", {
            "opacity-0 w-0": collapsed && !isMobile,
            "opacity-100": !collapsed || isMobile
          })}>
            TableTapster
          </Link>
          
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full hover:bg-sidebar-accent"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          )}
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className={cn("ml-3 transition-opacity duration-300", {
                    "opacity-0 w-0": collapsed && !isMobile,
                    "opacity-100": !collapsed || isMobile
                  })}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <Link to="/">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "px-0": collapsed && !isMobile
              })}
            >
              <LogOut size={20} />
              <span
                className={cn("ml-3 transition-opacity duration-300", {
                  "opacity-0 w-0": collapsed && !isMobile,
                  "opacity-100": !collapsed || isMobile
                })}
              >
                Logout
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
