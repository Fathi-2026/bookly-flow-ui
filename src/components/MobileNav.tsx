
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Plus, List, BarChart3, DollarSign, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/add-transaction", icon: Plus, label: "Add Transaction" },
    { to: "/transactions", icon: List, label: "Transactions" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Bookly</h1>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onToggle}
        />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-white transform transition-transform duration-300 ease-in-out shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onToggle}
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
      </div>

      {/* Mobile spacing */}
      <div className="lg:hidden h-16" />
    </>
  );
};
