/**
 * Card Component
 */

/**
 * Card component props
 */
export interface CardProps {
  /** Card title */
  title?: string;
  /** Card content */
  children: string;
  /** Card footer content */
  footer?: string;
  /** Whether to show shadow */
  elevated?: boolean;
  /** Card padding */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component interface
 */
export interface CardComponent {
  id: string;
  props: CardProps;
  render: () => string;
}

/**
 * Card padding sizes
 */
export const cardPadding: Record<string, string> = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6',
};

/**
 * Create a card component
 */
export function createCard(props: CardProps): CardComponent {
  const { title, children, footer, elevated = false, padding = 'medium', className = '' } = props;

  const cardId = `card-${Date.now()}`;
  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  const shadowClass = elevated ? 'shadow-lg' : 'shadow';
  const paddingClass = cardPadding[padding];
  const classes = [baseClasses, shadowClass, paddingClass, className].filter(Boolean).join(' ');

  const titleHtml = title ? `<h3 class="text-lg font-semibold text-gray-900 mb-4">${title}</h3>` : '';
  const footerHtml = footer ? `<div class="mt-4 pt-4 border-t border-gray-200">${footer}</div>` : '';

  return {
    id: cardId,
    props,
    render: () => `
      <div class="${classes}">
        ${titleHtml}
        <div class="card-body">
          ${children}
        </div>
        ${footerHtml}
      </div>
    `,
  };
}
