import type { BandBreakdown } from './BandBreakdown';

export interface TaxCalculationResult {
  totalTaxes: number;
  effectiveRate: number;
  bandsBreakdown: BandBreakdown[];
}
