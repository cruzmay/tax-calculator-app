import type { TaxBracket } from './TaxBracket';

export interface BandBreakdown {
  bracket: TaxBracket;
  taxableAmount: number;
  taxAmount: number;
  cumulativeTax: number;
}
