import type { TaxBracket, TaxYear } from '../interfaces';

// Tax brackets
export const TAX_BRACKETS: TaxBracket[] = [
  {
    min: 0,
    max: 50197,
    rate: 0.15,
  },
  {
    min: 50197,
    max: 100392,
    rate: 0.205,
  },
  {
    min: 100392,
    max: 155625,
    rate: 0.26,
  },
  {
    min: 155625,
    max: 221708,
    rate: 0.29,
  },
  {
    min: 221708,
    rate: 0.33,
  },
];

// Tax constants
export const TAX_YEARS: TaxYear[] = ['2019', '2020', '2021', '2022'];
export const MIN_SALARY = 0;
export const SALARY_ERROR_MESSAGE = 'Annual income must be a positive number';

// API constants
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5001';
export const MAX_RETRIES = 3;
export const RETRY_DELAY_MS = 1000;
export const REQUEST_TIMEOUT_MS = 10000;
export const HTTP_STATUS_SERVER_ERROR = 500;
export const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
export const DATABASE_NOT_FOUND_ERROR_MESSAGE = 'Database not found';

// Utility constants
export const PERCENTAGE_MULTIPLIER = 100;

// HTTP status codes
export const HTTP_STATUS_NOT_FOUND = 404;
