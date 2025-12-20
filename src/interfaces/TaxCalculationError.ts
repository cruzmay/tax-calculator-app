export interface TaxCalculationError {
  message: string;
  type: 'validation error' | 'api error' | 'network error' | 'unknown error';
}
