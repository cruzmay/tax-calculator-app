import { HTTP_STATUS_NOT_FOUND, TAX_BRACKETS } from '../../constants';

const mockGet = jest.fn();
const mockCreate = jest.fn(() => ({
  get: mockGet,
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: mockCreate,
  },
}));

describe('taxApi', () => {
  const mockTaxBrackets = {
    tax_brackets: TAX_BRACKETS,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockClear();
    mockCreate.mockReturnValue({
      get: mockGet,
    });
  });

  it('should fetch tax brackets successfully', async () => {
    mockGet.mockResolvedValue({ data: mockTaxBrackets });
    const { fetchTaxBrackets } = await import('../../services/taxApi');

    const result = await fetchTaxBrackets('2022');

    expect(result).toEqual(mockTaxBrackets);
    expect(mockGet).toHaveBeenCalledWith('/tax-calculator/tax-year/2022');
  });

  it('should throw error for 404 status', async () => {
    mockGet.mockRejectedValue({
      response: {
        status: HTTP_STATUS_NOT_FOUND,
      },
    });
    const { fetchTaxBrackets } = await import('../../services/taxApi');

    await expect(fetchTaxBrackets('2022')).rejects.toThrow(
      'Tax brackets not found for 2022'
    );
  });

  it('should throw error for network errors', async () => {
    const networkError = new Error('Network Error');
    mockGet.mockRejectedValue(networkError);
    const { fetchTaxBrackets } = await import('../../services/taxApi');

    await expect(fetchTaxBrackets('2022')).rejects.toThrow('Network Error');
  });
});
