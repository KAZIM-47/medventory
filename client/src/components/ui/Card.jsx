import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E2EBDD] shadow-[0_1px_3px_0_rgba(24,59,50,0.04)] overflow-hidden transition-shadow duration-200 hover:shadow-[0_4px_6px_-1px_rgba(24,59,50,0.06)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', title, subtitle, action }) {
  if (title || subtitle || action) {
    return (
      <div className={`p-5 border-b border-[#E2EBDD] flex items-center justify-between gap-4 ${className}`}>
        <div>
          {title && <h3 className="text-base font-semibold text-[#183B32] tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-[#5A6F63] mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  }

  return <div className={`p-5 border-b border-[#E2EBDD] ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`p-4 bg-[#F7FAF5] border-t border-[#E2EBDD] text-xs text-[#5A6F63] ${className}`}>
      {children}
    </div>
  );
}

