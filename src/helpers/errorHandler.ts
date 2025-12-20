import { HTTP_STATUS_NOT_FOUND } from '../constants';
import type { TaxCalculationError } from '../interfaces';

export function determineErrorType(
  error: unknown
): TaxCalculationError['type'] {
  if (!error || typeof error !== 'object') {
    return 'unknown error';
  }

  if ('response' in error) {
    const axiosError = error as { response?: { status?: number } };
    const status = axiosError.response?.status;

    if (status === HTTP_STATUS_NOT_FOUND) {
      return 'api error';
    }

    if (status === undefined && axiosError.response) {
      return 'network error';
    }
  } else if (error instanceof Error) {
    return 'network error';
  }

  return 'unknown error';
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
