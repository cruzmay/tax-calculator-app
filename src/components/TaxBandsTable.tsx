import type { BandBreakdown, TaxCalculationResult } from '../interfaces';
import {
  formatCurrency,
  formatPercentage,
  formatBracketRange,
} from '../helpers/formatters';

interface TaxBandsTableProps {
  result: TaxCalculationResult;
}

export function TaxBandsTable({ result }: TaxBandsTableProps): React.ReactNode {
  return (
    <div className="w-full flex flex-col items-start justify-center bg-white p-4 py-8 rounded-lg gap-4 shadow-md slide-in">
      <h3 className="text-xl font-semibold text-gray-900">
        Tax Breakdown by Bracket
      </h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left text-gray-700 font-bold py-3 px-4 border-r border-gray-200 text-nowrap">
                Bracket Range
              </th>
              <th className="text-right text-gray-700 font-bold py-3 px-4 border-r border-gray-200 text-nowrap">
                Rate
              </th>
              <th className="text-right text-gray-700 font-bold py-3 px-4 border-r border-gray-200 text-nowrap">
                Taxable Amount
              </th>
              <th className="text-right text-gray-700 font-bold py-3 px-4 border-r border-gray-200 text-nowrap">
                Tax Amount
              </th>
              <th className="text-right text-gray-700 font-bold py-3 px-4 text-nowrap">
                Cumulative Tax
              </th>
            </tr>
          </thead>
          <tbody>
            {result.bandsBreakdown.map((band: BandBreakdown, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="text-left text-gray-700 py-3 px-4 border-r border-gray-200 font-medium text-nowrap">
                  {formatBracketRange(band.bracket.min, band.bracket.max)}
                </td>
                <td className="text-right text-gray-700 py-3 px-4 border-r border-gray-200 font-medium text-nowrap">
                  {formatPercentage(band.bracket.rate)}
                </td>
                <td className="text-right text-gray-700 py-3 px-4 border-r border-gray-200 font-medium text-nowrap">
                  {formatCurrency(band.taxableAmount)}
                </td>
                <td className="text-right text-gray-700 py-3 px-4 border-r border-gray-200 font-medium text-nowrap">
                  {formatCurrency(band.taxAmount)}
                </td>
                <td className="text-right text-gray-700 py-3 px-4 font-medium text-nowrap">
                  {formatCurrency(band.cumulativeTax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
