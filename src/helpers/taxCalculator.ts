import { MIN_SALARY, PERCENTAGE_MULTIPLIER } from '../constants';
import type {
  TaxBracket,
  TaxCalculationResult,
  BandBreakdown,
} from '../interfaces';

function calculateTaxableAmountInBracket(
  salary: number,
  bracketMin: number,
  bracketMax: number
): number {
  const upperBound = Math.min(salary, bracketMax);
  const lowerBound = Math.max(MIN_SALARY, bracketMin);
  return Math.max(0, upperBound - lowerBound);
}

function calculateBracketTax(
  salary: number,
  bracket: TaxBracket,
  cumulativeTax: number
): BandBreakdown | null {
  const bracketMax = bracket.max ?? Infinity;
  const taxableAmount = calculateTaxableAmountInBracket(
    salary,
    bracket.min,
    bracketMax
  );

  if (taxableAmount <= 0) {
    return null;
  }

  const taxAmount = taxableAmount * bracket.rate;
  const newCumulativeTax = cumulativeTax + taxAmount;

  return {
    bracket,
    taxableAmount,
    taxAmount,
    cumulativeTax: newCumulativeTax,
  };
}

export function calculateTaxes(
  salary: number,
  taxBrackets: TaxBracket[]
): TaxCalculationResult {
  if (salary <= MIN_SALARY) {
    return {
      totalTaxes: 0,
      effectiveRate: 0,
      bandsBreakdown: [],
    };
  }

  const bandsBreakdown: BandBreakdown[] = [];
  let cumulativeTax = 0;

  for (const bracket of taxBrackets) {
    const bandBreakdown = calculateBracketTax(salary, bracket, cumulativeTax);

    if (bandBreakdown) {
      cumulativeTax = bandBreakdown.cumulativeTax;
      bandsBreakdown.push(bandBreakdown);
    }
  }

  const effectiveRate = (cumulativeTax / salary) * PERCENTAGE_MULTIPLIER;

  return {
    totalTaxes: cumulativeTax,
    effectiveRate,
    bandsBreakdown,
  };
}
