import { render, screen } from '@testing-library/react';
import { TaxResults } from '../../components/TaxResults';

describe('TaxResults', () => {
  it('should match snapshot', () => {
    const mockResult = {
      totalTaxes: 10000,
      effectiveRate: 20,
      bandsBreakdown: [],
    };
    const { container } = render(<TaxResults result={mockResult} />);
    expect(container).toMatchSnapshot();
  });

  it('should render tax results', () => {
    const mockResult = {
      totalTaxes: 10000,
      effectiveRate: 20,
      bandsBreakdown: [],
    };

    render(<TaxResults result={mockResult} />);

    expect(screen.getByText('Tax Calculation Results')).toBeInTheDocument();
    expect(screen.getByText(/total taxes owed/i)).toBeInTheDocument();
    expect(screen.getByText(/effective rate/i)).toBeInTheDocument();
  });
});
