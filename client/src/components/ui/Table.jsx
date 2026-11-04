import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-left text-sm border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return (
    <thead className={`bg-[#F7FAF5] border-b border-[#E2EBDD] text-xs font-semibold text-[#183B32] uppercase tracking-wider ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }) {
  return <tbody className={`divide-y divide-[#E2EBDD] bg-white ${className}`}>{children}</tbody>;
}

export function TableRow({ children, className = '', hover = true }) {
  return (
    <tr
      className={`transition-colors duration-150 ${hover ? 'hover:bg-[#F7FAF5]' : ''} ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return <th className={`px-4 py-3 text-left font-semibold text-[#183B32] ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }) {
  return <td className={`px-4 py-3.5 text-[#34423A] align-middle ${className}`}>{children}</td>;
}

