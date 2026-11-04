import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#183B32]/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div
          className={`w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-[#E2EBDD] my-8 flex flex-col max-h-[90vh]`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2EBDD] px-6 py-4 bg-[#F7FAF5] shrink-0">
            <div>
              {title && (
                <h3 className="text-lg font-bold text-[#183B32] tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#5A6F63] mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#183B32]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 flex-1 text-[#34423A]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

