import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-3.5 py-2 rounded-lg gap-2',
    lg: 'text-base px-4 py-2.5 rounded-xl gap-2.5',
    icon: 'p-2 rounded-lg',
  };

  const variantStyles = {
    primary:
      'bg-[#183B32] text-white hover:bg-[#112B24] active:bg-[#0B1E19] focus:ring-[#183B32] shadow-sm',
    secondary:
      'bg-[#D7FCD4] text-[#183B32] hover:bg-[#C7E4BB] active:bg-[#BFD8AE] focus:ring-[#183B32] font-semibold',
    outline:
      'border border-[#E2EBDD] bg-white text-[#183B32] hover:bg-[#F7FAF5] active:bg-[#EEF6EC] focus:ring-[#183B32]',
    ghost:
      'text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32] focus:ring-[#183B32]',
    destructive:
      'bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FECACA] active:bg-[#FCA5A5] focus:ring-[#991B1B]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}

