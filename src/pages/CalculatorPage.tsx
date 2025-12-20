import {
  ErrorMessage,
  LoadingSpinner,
  TaxBandsTable,
  TaxCalculatorForm,
  TaxResults,
} from '../components';
import { useTaxCalculation } from '../hooks/useTaxCalculation';

export function CalculatorPage(): React.ReactNode {
  const { loading, error, calculationResult, calculate, clearError } =
    useTaxCalculation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <header className="w-full h-full flex flex-col items-center justify-center gap-2 mt-8">
        <h1 className="text-3xl text-gray-700 font-bold">Tax Calculator</h1>
        <p className="text-gray-500">
          Calculate your income tax based on tax brackets
        </p>
      </header>

      <main className="w-full max-w-3xl p-4 gap-4 h-full flex flex-col items-center justify-center">
        <TaxCalculatorForm onSubmit={calculate} loading={loading} />

        {error && <ErrorMessage error={error} onDismiss={clearError} />}

        {loading && <LoadingSpinner />}

        {calculationResult && !loading && (
          <>
            <TaxResults result={calculationResult} />
            <TaxBandsTable result={calculationResult} />
          </>
        )}
      </main>
    </div>
  );
}
