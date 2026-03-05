import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Explore", path: "/" },
    { name: "Problems", path: "/problemset" },
    { name: "Contest", path: "/contest" },
    { name: "Discuss", path: "/discuss" },
  ];

  return (
    <nav className="h-12 bg-nav flex items-center px-4 border-b border-border/20 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 mr-8">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">LC</span>
        </div>
        <span className="text-nav-foreground font-semibold text-sm tracking-tight">LeetCode</span>
      </Link>

      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              location.pathname === item.path
                ? "text-nav-foreground font-medium"
                : "text-nav-foreground/60 hover:text-nav-foreground/80"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-nav-foreground/40" />
          <input
            type="text"
            placeholder="Search questions"
            className="bg-nav-foreground/10 text-nav-foreground text-xs rounded-md pl-8 pr-3 py-1.5 w-44 placeholder:text-nav-foreground/30 border-none outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <span className="text-premium text-xs font-medium cursor-pointer hover:opacity-80">Premium</span>
        <button className="text-nav-foreground/70 text-xs hover:text-nav-foreground transition-colors">Register</button>
        <span className="text-nav-foreground/30 text-xs">or</span>
        <button className="text-nav-foreground/70 text-xs hover:text-nav-foreground transition-colors">Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
