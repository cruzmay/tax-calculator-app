import { determineErrorType } from '../../helpers/errorHandler';
import { HTTP_STATUS_NOT_FOUND } from '../../constants';

describe('errorHandler', () => {
  describe('determineErrorType', () => {
    it('should return api error for 404 status', () => {
      const error = {
        response: {
          status: HTTP_STATUS_NOT_FOUND,
        },
      };
      expect(determineErrorType(error)).toBe('api error');
    });

    it('should return network error for Error instance', () => {
      const error = new Error('Network error');
      expect(determineErrorType(error)).toBe('network error');
    });

    it('should return network error for axios error without status', () => {
      const error = {
        response: {},
      };
      expect(determineErrorType(error)).toBe('network error');
    });

    it('should return unknown error for null', () => {
      expect(determineErrorType(null)).toBe('unknown error');
    });

    it('should return unknown error for undefined', () => {
      expect(determineErrorType(undefined)).toBe('unknown error');
    });

    it('should return unknown error for non-object', () => {
      expect(determineErrorType('string')).toBe('unknown error');
    });
  });
});
