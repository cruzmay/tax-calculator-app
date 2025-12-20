import { renderHook, waitFor, act } from '@testing-library/react';
import { useTaxCalculation } from '../../hooks/useTaxCalculation';
import { fetchTaxBrackets } from '../../services/taxApi';
import { calculateTaxes } from '../../helpers/taxCalculator';
import { TAX_BRACKETS } from '../../constants';

jest.mock('../../services/taxApi');
jest.mock('../../helpers/taxCalculator');

describe('useTaxCalculation', () => {
  const mockTaxBrackets = TAX_BRACKETS;

  const mockCalculationResult = {
    totalTaxes: 1000,
    effectiveRate: 10,
    bandsBreakdown: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTaxCalculation());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.calculationResult).toBeNull();
    expect(result.current.taxBrackets).toBeNull();
  });

  it('should calculate taxes successfully', async () => {
    (
      fetchTaxBrackets as jest.MockedFunction<typeof fetchTaxBrackets>
    ).mockResolvedValue({
      tax_brackets: mockTaxBrackets,
    });
    (
      calculateTaxes as jest.MockedFunction<typeof calculateTaxes>
    ).mockReturnValue(mockCalculationResult);

    const { result } = renderHook(() => useTaxCalculation());

    await act(async () => {
      await result.current.calculate(50000, '2022');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.calculationResult).not.toBeNull();
    });

    expect(result.current.calculationResult).toEqual(mockCalculationResult);
    expect(result.current.taxBrackets).toEqual(mockTaxBrackets);
    expect(result.current.error).toBeNull();
  });
});
