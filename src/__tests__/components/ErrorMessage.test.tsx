import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../../components/ErrorMessage';
import type { TaxCalculationError } from '../../interfaces';

describe('ErrorMessage', () => {
  it('should match snapshot', () => {
    const error = {
      message: 'Test error',
      type: 'validation error' as TaxCalculationError['type'],
    };
    const { container } = render(<ErrorMessage error={error} />);
    expect(container).toMatchSnapshot();
  });

  it('should render error message', () => {
    const error = {
      message: 'Test error',
      type: 'validation error' as TaxCalculationError['type'],
    };

    render(<ErrorMessage error={error} />);

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should call onDismiss when button is clicked', () => {
    const error = {
      message: 'Test error',
      type: 'validation error' as TaxCalculationError['type'],
    };
    const mockOnDismiss = jest.fn();

    render(<ErrorMessage error={error} onDismiss={mockOnDismiss} />);

    const dismissButton = screen.getByLabelText('Dismiss error');
    fireEvent.click(dismissButton);

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('should not show dismiss button when onDismiss is not provided', () => {
    const error = {
      message: 'Test error',
      type: 'validation error' as TaxCalculationError['type'],
    };

    render(<ErrorMessage error={error} />);

    expect(screen.queryByLabelText('Dismiss error')).not.toBeInTheDocument();
  });
});
