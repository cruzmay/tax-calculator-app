import { useCallback } from 'react';
import type { TaxCalculationError } from '../interfaces';

interface ErrorMessageProps {
  error: TaxCalculationError;
  onDismiss?: () => void;
}

export function ErrorMessage({
  error,
  onDismiss,
}: ErrorMessageProps): React.ReactNode {
  const getErrorMessage = useCallback(() => {
    switch (error.type) {
      case 'validation error':
        return error.message;
      case 'api error':
        return `API Error: ${error.message}. Please try again.`;
      case 'network error':
        return `Network Error: ${error.message}. Please check your connection.`;
      default:
        return `Error: ${error.message}`;
    }
  }, [error]);

  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex justify-between items-center slide-in"
      role="alert"
    >
      <span>{getErrorMessage()}</span>

      {onDismiss && (
        <button
          className="text-red-700 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 transition-colors"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
