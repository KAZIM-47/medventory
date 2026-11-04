import React from 'react';
import { Menu, Search, Bell, User, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export function Topbar({ onOpenMobileNav }) {
  return (
    <header className="h-16 bg-white border-b border-[#E2EBDD] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile Menu Button & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-lg text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32] focus:outline-none focus:ring-2 focus:ring-[#183B32]"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6F63]" />
          <input
            type="text"
            placeholder="Search medicine, SKU, batch..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-xs text-[#34423A] placeholder-[#5A6F63] focus:outline-none focus:bg-white focus:border-[#183B32] focus:ring-1 focus:ring-[#183B32] transition-colors"
          />
        </div>
      </div>

      {/* Right: Quick Action, Alerts & User Profile */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" icon={Plus} className="hidden md:inline-flex">
          New Sale
        </Button>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#183B32] border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-[#E2EBDD] hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center font-bold text-xs">
            DR
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-[#183B32] leading-none">Dr. Rayan Ali</p>
            <p className="text-[10px] text-[#5A6F63] mt-1 font-medium">Head Pharmacist</p>
          </div>
        </div>
      </div>
    </header>
  );
}

