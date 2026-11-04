import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  Boxes,
  Truck,
  ShoppingCart,
  Receipt,
  BarChart3,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Medicines', path: '/medicines', icon: Pill },
  { name: 'Inventory', path: '/inventory', icon: Boxes },
  { name: 'Suppliers', path: '/suppliers', icon: Truck },
  { name: 'Purchases', path: '/purchases', icon: ShoppingCart },
  { name: 'Sales & Billing', path: '/sales-billing', icon: Receipt },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ className = '' }) {
  return (
    <aside
      className={`w-64 bg-white border-r border-[#E2EBDD] flex flex-col h-screen shrink-0 ${className}`}
    >
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-[#E2EBDD] flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#183B32] text-[#D7FCD4] flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
            M
          </div>
          <div>
            <span className="font-bold text-base text-[#183B32] tracking-tight block">
              Medventory
            </span>
            <span className="text-[11px] font-medium text-[#5A6F63] block -mt-0.5">
              Pharmacy Intelligence
            </span>
          </div>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-[#5A6F63] uppercase tracking-wider">
          Main Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#183B32] text-white shadow-sm'
                    : 'text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#D7FCD4]' : 'text-[#5A6F63]'
                    }`}
                  />
                  <span>{item.name}</span>
                  {item.name === 'Dashboard' && (
                    <span
                      className={`ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#235246] text-[#D7FCD4]'
                          : 'bg-[#EEF6EC] text-[#183B32]'
                      }`}
                    >
                      Sample Data
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-[#E2EBDD] bg-[#F7FAF5]">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-[#E2EBDD]">
          <ShieldCheck className="w-4 h-4 text-[#183B32] shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#183B32] truncate">Frontend Preview</p>
            <p className="text-[10px] text-[#5A6F63] truncate">Sample Data Mode</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#B6CCA1] shrink-0" />
        </div>
      </div>
    </aside>
  );
}

