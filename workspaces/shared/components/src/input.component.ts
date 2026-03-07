/**
 * Input Component
 */

/**
 * Input types
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * Input component props
 */
export interface InputProps {
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Input type */
  type?: InputType;
  /** Input name */
  name?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Help text */
  helpText?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Input component interface
 */
export interface InputComponent {
  id: string;
  props: InputProps;
  render: () => string;
}

/**
 * Create an input component
 */
export function createInput(props: InputProps): InputComponent {
  const {
    label,
    placeholder = '',
    value = '',
    type = 'text',
    name,
    disabled = false,
    required = false,
    error,
    helpText,
    className = '',
  } = props;

  const inputId = `input-${Date.now()}`;
  const baseClasses = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2';
  const errorClass = error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200';
  const disabledClass = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  const classes = [baseClasses, errorClass, disabledClass, className].filter(Boolean).join(' ');

  const labelHtml = label
    ? `<label for="${inputId}" class="block text-sm font-medium text-gray-700 mb-1">${label}${required ? ' *' : ''}</label>`
    : '';

  const helpTextHtml = helpText && !error ? `<p class="mt-1 text-sm text-gray-500">${helpText}</p>` : '';
  const errorHtml = error ? `<p class="mt-1 text-sm text-red-500">${error}</p>` : '';

  return {
    id: inputId,
    props,
    render: () => `
      ${labelHtml}
      <input
        type="${type}"
        id="${inputId}"
        name="${name || ''}"
        placeholder="${placeholder}"
        value="${value}"
        class="${classes}"
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
      />
      ${helpTextHtml}
      ${errorHtml}
    `,
  };
}
