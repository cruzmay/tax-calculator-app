import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import type { TaxYear } from '../interfaces';
import { SALARY_ERROR_MESSAGE, TAX_YEARS } from '../constants';

interface TaxCalculatorFormProps {
  onSubmit: (salary: number, year: TaxYear) => void;
  loading: boolean;
}

export function TaxCalculatorForm({
  onSubmit,
  loading,
}: TaxCalculatorFormProps): React.ReactNode {
  const [salary, setSalary] = useState<string>('');
  const [year, setYear] = useState<TaxYear>('2022');
  const [salaryError, setSalaryError] = useState<string>('');

  const validateSalary = (value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setSalaryError(SALARY_ERROR_MESSAGE);
      return false;
    }
    setSalaryError('');
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateSalary(salary) || !salary.trim()) {
      return;
    }

    onSubmit(parseFloat(salary), year);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSalary(value);

    if (value.trim()) {
      validateSalary(value);
    } else {
      setSalaryError('');
    }
  };

  const computedInputClassName = useCallback((error: boolean) => {
    return error
      ? 'w-full p-2 rounded-md border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
      : 'w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
  }, []);

  return (
    <form
      className="w-full flex flex-col items-center justify-center bg-white p-4 rounded-lg gap-4 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <label
          htmlFor="salary"
          className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold"
        >
          Annual Income <span>*</span>
        </label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={handleSalaryChange}
          placeholder="Enter annual income"
          min="0"
          step="0.01"
          required
          disabled={loading}
          className={computedInputClassName(!!salaryError)}
        />
        {salaryError && <span className="text-red-700">{salaryError}</span>}
      </div>

      <div className="w-full flex flex-row items-center justify-center gap-2">
        <label
          htmlFor="year"
          className="text-gray-700 flex flex-row items-center justify-center gap-1 text-nowrap font-bold"
        >
          Tax Year <span>*</span>
        </label>
        <select
          id="year"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={(e) => setYear(e.target.value as TaxYear)}
          disabled={loading}
        >
          {TAX_YEARS.map((year: TaxYear) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer w-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
        disabled={loading || !salary.trim() || !!salaryError}
      >
        {loading ? 'Calculating...' : 'Calculate Taxes'}
      </button>
    </form>
  );
}
