import React from 'react';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5',
    lg: 'text-sm px-3 py-1.2 rounded-full gap-2',
  };

  const variantStyles = {
    default: 'bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]',
    celadon: 'bg-[#C7E4BB] text-[#183B32] border border-[#BFD8AE]',
    forest: 'bg-[#183B32] text-white',
    neutral: 'bg-[#F7FAF5] text-[#5A6F63] border border-[#E2EBDD]',
    warning: 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]',
    danger: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]',
  };

  const dotStyles = {
    default: 'bg-[#183B32]',
    celadon: 'bg-[#183B32]',
    forest: 'bg-[#D7FCD4]',
    neutral: 'bg-[#5A6F63]',
    warning: 'bg-[#B45309]',
    danger: 'bg-[#DC2626]',
  };

  return (
    <span
      className={`inline-flex items-center font-medium ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyles[variant] || dotStyles.default}`} />}
      {children}
    </span>
  );
}

