import { TAX_BRACKETS } from '../../constants';
import { calculateTaxes } from '../../helpers/taxCalculator';
import type { TaxBracket } from '../../interfaces';

describe('calculateTaxes', () => {
  const mockBrackets: TaxBracket[] = TAX_BRACKETS;

  it('should return zero taxes for salary in 0', () => {
    const result = calculateTaxes(0, mockBrackets);
    expect(result.totalTaxes).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.bandsBreakdown).toEqual([]);
  });

  it('should return zero taxes for salary in negative', () => {
    const result = calculateTaxes(-1000, mockBrackets);
    expect(result.totalTaxes).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.bandsBreakdown).toEqual([]);
  });

  it('should calculate taxes correctly for salary in first bracket', () => {
    const result = calculateTaxes(50000, mockBrackets);
    expect(result.totalTaxes).toBe(7500);
  });

  it('should calculate taxes correctly for salary in second bracket', () => {
    const result = calculateTaxes(100000, mockBrackets);

    expect(result.totalTaxes).toBeCloseTo(17739.17, 2);
    expect(result.effectiveRate).toBeCloseTo(17.74, 2);
    expect(result.bandsBreakdown).toHaveLength(2);
  });

  it('should calculate taxes correctly for salary in multiple brackets', () => {
    const result = calculateTaxes(200000, mockBrackets);
    expect(result.totalTaxes).toBeCloseTo(45048.85, 2);
    expect(result.effectiveRate).toBeCloseTo(22.52, 2);
    expect(result.bandsBreakdown).toHaveLength(4);
  });

  it('should calculate effective rate correctly', () => {
    const result = calculateTaxes(221708, mockBrackets);
    const expectedRate = (result.totalTaxes / 221708) * 100;
    expect(result.effectiveRate).toBeCloseTo(expectedRate, 2);
  });

  it('should calculate taxes correctly for salary $1,234,567', () => {
    const result = calculateTaxes(1234567, mockBrackets);
    expect(result.totalTaxes).toBeCloseTo(385587.65, 1);
  });
});
