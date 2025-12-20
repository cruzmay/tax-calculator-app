import axios, { AxiosError } from 'axios';
import type { TaxBracketsResponse, TaxYear } from '../interfaces';
import {
  API_BASE_URL,
  MAX_RETRIES,
  REQUEST_TIMEOUT_MS,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
  RETRY_DELAY_MS,
  HTTP_STATUS_NOT_FOUND,
} from '../constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchTaxBrackets(
  year: TaxYear,
  retryCount = 0
): Promise<TaxBracketsResponse> {
  try {
    const response = await apiClient.get<TaxBracketsResponse>(
      `/tax-calculator/tax-year/${year}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HTTP_STATUS_NOT_FOUND) {
      throw new Error(`Tax brackets not found for ${year}`);
    }

    if (
      axiosError.response?.status === HTTP_STATUS_SERVER_ERROR ||
      axiosError.response?.status === HTTP_STATUS_SERVICE_UNAVAILABLE ||
      retryCount >= MAX_RETRIES
    ) {
      console.warn(`Retrying... ${retryCount + 1} of ${MAX_RETRIES}`);
      const delay = RETRY_DELAY_MS * retryCount;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchTaxBrackets(year, retryCount + 1);
    }

    throw error;
  }
}
