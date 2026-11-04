import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS } from './Sidebar';

export function MobileNav({ isOpen, onClose }) {
  const location = useLocation();

  // Close mobile navigation on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#183B32]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-white border-r border-[#E2EBDD] flex flex-col shadow-xl z-50">
        {/* Header */}
        <div className="h-16 px-5 border-b border-[#E2EBDD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#183B32] text-[#D7FCD4] flex items-center justify-center font-bold text-base shadow-sm">
              M
            </div>
            <div>
              <span className="font-bold text-sm text-[#183B32] tracking-tight block">
                Medventory
              </span>
              <span className="text-[10px] font-medium text-[#5A6F63] block -mt-0.5">
                Pharmacy Intelligence
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC]"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-[#5A6F63] uppercase tracking-wider">
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
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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

        {/* Footer */}
        <div className="p-4 border-t border-[#E2EBDD] bg-[#F7FAF5]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E2EBDD]">
            <ShieldCheck className="w-4 h-4 text-[#183B32] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#183B32]">Frontend Preview</p>
              <p className="text-[10px] text-[#5A6F63]">Sample Data Mode</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#B6CCA1]" />
          </div>
        </div>
      </div>
    </div>
  );
}

