import type { TailngButtonSize, TailngButtonVariant } from './button.types';

const base =
  'inline-flex items-center justify-center gap-2 font-medium select-none ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const sizes: Record<TailngButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-5 text-base rounded-lg',
};

const variants: Record<TailngButtonVariant, string> = {
  solid: 'bg-primary text-white hover:opacity-90',
  outline: 'border border-gray-300 hover:bg-gray-50',
  ghost: 'hover:bg-gray-100',
};

export const buttonClasses = (variant: TailngButtonVariant, size: TailngButtonSize) =>
  `${base} ${sizes[size]} ${variants[variant]}`;

