import { render, screen, fireEvent } from '@testing-library/react';
import { TaxCalculatorForm } from '../../components/TaxCalculatorForm';

describe('TaxCalculatorForm', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <TaxCalculatorForm onSubmit={() => {}} loading={false} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render form with inputs', () => {
    const mockOnSubmit = jest.fn();
    render(<TaxCalculatorForm onSubmit={mockOnSubmit} loading={false} />);

    expect(screen.getByLabelText(/annual income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tax year/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /calculate taxes/i })
    ).toBeInTheDocument();
  });

  it('should call onSubmit with correct values', () => {
    const mockOnSubmit = jest.fn();
    render(<TaxCalculatorForm onSubmit={mockOnSubmit} loading={false} />);

    const salaryInput = screen.getByLabelText(/annual income/i);
    const submitButton = screen.getByRole('button', {
      name: /calculate taxes/i,
    });

    fireEvent.change(salaryInput, { target: { value: '50000' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(50000, '2022');
  });

  it('should disable button when loading', () => {
    const mockOnSubmit = jest.fn();
    render(<TaxCalculatorForm onSubmit={mockOnSubmit} loading={true} />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Calculating...');
  });
});
