import { useState, useCallback } from 'react';
import type {
  TaxBracket,
  TaxCalculationResult,
  TaxYear,
  TaxCalculationError,
} from '../interfaces';
import { fetchTaxBrackets } from '../services/taxApi';
import {
  calculateTaxes,
  extractErrorMessage,
  determineErrorType,
} from '../helpers';
import { MIN_SALARY, SALARY_ERROR_MESSAGE } from '../constants';

interface UseTaxCalculationReturn {
  loading: boolean;
  error: TaxCalculationError | null;
  taxBrackets: TaxBracket[] | null;
  calculationResult: TaxCalculationResult | null;
  calculate: (salary: number, year: TaxYear) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export function useTaxCalculation(): UseTaxCalculationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TaxCalculationError | null>(null);
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[] | null>(null);
  const [calculationResult, setCalculationResult] =
    useState<TaxCalculationResult | null>(null);

  const validateSalary = (salary: number): boolean => {
    return salary >= MIN_SALARY;
  };

  const calculate = useCallback(async (salary: number, year: TaxYear) => {
    if (!validateSalary(salary)) {
      setError({
        message: SALARY_ERROR_MESSAGE,
        type: 'validation error',
      });
      return;
    }

    setLoading(true);
    setError(null);
    setCalculationResult(null);

    try {
      const response = await fetchTaxBrackets(year);
      setTaxBrackets(response.tax_brackets);

      const result = calculateTaxes(salary, response.tax_brackets);
      setCalculationResult(result);
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      const errorType = determineErrorType(err);

      setError({
        message: errorMessage,
        type: errorType,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setTaxBrackets(null);
    setCalculationResult(null);
  }, []);

  return {
    loading,
    error,
    taxBrackets,
    calculationResult,
    calculate,
    clearError,
    reset,
  };
}
