import type { TaxCalculationResult } from '../interfaces';
import { formatCurrency, formatPercentage } from '../helpers';

interface TaxResultsProps {
  result: TaxCalculationResult;
}

export function TaxResults({ result }: TaxResultsProps): React.ReactNode {
  return (
    <div className="w-full flex flex-col items-start justify-center bg-white p-4 py-8 rounded-lg gap-4 shadow-md slide-in">
      <h2 className="text-xl text-gray-700 font-semibold">
        Tax Calculation Results
      </h2>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-row items-center justify-between gap-2 border-b border-gray-200 pb-2">
          <span className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold">
            Total Taxes Owed
          </span>
          <span className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold">
            {formatCurrency(result.totalTaxes)}
          </span>
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-2">
          <span className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold">
            Effective Rate
          </span>
          <span className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold">
            {formatPercentage(result.effectiveRate / 100)}
          </span>
        </div>
      </div>
    </div>
  );
}
