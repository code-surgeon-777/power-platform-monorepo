/**
 * Button Component
 */

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button sizes
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button component props
 */
export interface ButtonProps {
  /** Button text or content */
  label: string;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is loading */
  loading?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: () => void;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button icon (optional) */
  icon?: string;
}

/**
 * Button component interface
 */
export interface ButtonComponent {
  /** Unique identifier */
  id: string;
  /** Component props */
  props: ButtonProps;
  /** Render method */
  render: () => string;
}

/**
 * Button style configuration
 */
export const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  ghost: 'text-gray-600 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

/**
 * Button size configuration
 */
export const buttonSizes: Record<ButtonSize, string> = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

/**
 * Create a button component
 */
export function createButton(props: ButtonProps): ButtonComponent {
  const {
    label,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    type = 'button',
    fullWidth = false,
    className = '',
    icon,
  } = props;

  const baseClasses = 'rounded font-medium transition-colors focus:outline-none focus:ring-2';
  const variantClasses = buttonStyles[variant];
  const sizeClasses = buttonSizes[size];
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = [baseClasses, variantClasses, sizeClasses, widthClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return {
    id: `btn-${Date.now()}`,
    props,
    render: () => {
      const iconHtml = icon ? `<span class="mr-2">${icon}</span>` : '';
      const loaderHtml = loading ? '<span class="animate-spin">⏳</span>' : '';
      return `<button type="${type}" class="${classes}" ${disabled ? 'disabled' : ''}>${loaderHtml}${iconHtml}${label}</button>`;
    },
  };
}
