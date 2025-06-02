
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Plus, List, BarChart3, DollarSign } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/add-transaction", icon: Plus, label: "Add Transaction" },
    { to: "/transactions", icon: List, label: "Transactions" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className={cn("fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg", className)}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Bookly</h1>
            <p className="text-sm text-gray-500">Accounting</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4">
          <div className="text-xs text-gray-500 text-center">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};
