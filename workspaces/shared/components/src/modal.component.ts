/**
 * Modal Component
 */

/**
 * Modal component props
 */
export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Modal title */
  title?: string;
  /** Modal body content */
  children: string;
  /** Modal footer content */
  footer?: string;
  /** Close handler */
  onClose: () => void;
  /** Modal size */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdrop?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Modal component interface
 */
export interface ModalComponent {
  id: string;
  props: ModalProps;
  render: () => string;
}

/**
 * Modal sizes
 */
export const modalSizes: Record<string, string> = {
  small: 'max-w-md',
  medium: 'max-w-2xl',
  large: 'max-w-4xl',
  fullscreen: 'max-w-full h-full',
};

/**
 * Create a modal component
 */
export function createModal(props: ModalProps): ModalComponent {
  const {
    isOpen,
    title,
    children,
    footer,
    onClose,
    size = 'medium',
    showCloseButton = true,
    closeOnBackdrop = true,
    className = '',
  } = props;

  const modalId = `modal-${Date.now()}`;
  const sizeClass = modalSizes[size];
  const displayClass = isOpen ? 'block' : 'hidden';
  const classes = [sizeClass, className].filter(Boolean).join(' ');

  const titleHtml = title
    ? `
    <div class="flex items-center justify-between p-4 border-b">
      <h3 class="text-lg font-semibold">${title}</h3>
      ${showCloseButton ? `<button data-modal-close class="text-gray-400 hover:text-gray-600">✕</button>` : ''}
    </div>
  `
    : '';

  const footerHtml = footer ? `<div class="p-4 border-t flex justify-end gap-2">${footer}</div>` : '';

  return {
    id: modalId,
    props,
    render: () => `
    <div class="fixed inset-0 z-50 ${displayClass}">
      <div class="absolute inset-0 bg-black bg-opacity-50" data-modal-backdrop="${closeOnBackdrop}"></div>
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white rounded-lg shadow-xl ${classes} w-full">
          ${titleHtml}
          <div class="p-4">
            ${children}
          </div>
          ${footerHtml}
        </div>
      </div>
    </div>
  `,
  };
}

/**
 * Helper to open modal
 */
export function openModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Helper to close modal
 */
export function closeModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}
