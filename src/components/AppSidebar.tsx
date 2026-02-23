import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  BarChart3,
  ChefHat,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const mainNav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", to: "/transactions", icon: ArrowLeftRight },
  { label: "Invoices", to: "/invoices", icon: FileText },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];

const bottomNav = [
  { label: "Settings", to: "#", icon: Settings },
  { label: "Help", to: "#", icon: HelpCircle },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <ChefHat className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-foreground leading-none">Savora</h1>
          <p className="text-[11px] text-muted-foreground">Restaurant Accounting</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
          Main
        </p>
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={() =>
              `nav-item ${location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to)) ? "active" : ""}`
            }
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-4 space-y-1">
        {bottomNav.map((item) => (
          <a key={item.label} href={item.to} className="nav-item">
            <item.icon className="w-[18px] h-[18px]" />
            <span>{item.label}</span>
          </a>
        ))}
        <div className="border-t border-sidebar-border my-2" />
        <div className="nav-item">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-[11px] text-muted-foreground truncate">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;

