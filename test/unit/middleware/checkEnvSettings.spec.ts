import checkEnvSettings from '../../../src/middleware/checkEnvSettings';
import { Response, NextFunction } from "express";

describe('Middleware: checkEnvSettings', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('When Env variables are not set', () => {
    it('should return 500 status', () => {
      process.env = {
        ...process.env,
        USER_NAME: undefined,
        TOKEN: undefined,
        RESOURCE_API_BASE_URL: undefined
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnValue({
          send: () => jest.fn()
        }),
      }

      const mockNext: Partial<NextFunction> = jest.fn();

      checkEnvSettings(undefined, mockResponse as Response, mockNext as NextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockNext as NextFunction).not.toHaveBeenCalled();
    });
  });

  describe('When Env variables are set', () => {
    it('should append user settings to res.locals', () => {
      process.env = {
        ...process.env,
        USER_NAME: 'test name',
        TOKEN: 'test token',
        RESOURCE_API_BASE_URL: 'resource base url'
      };

      const mockResponse: Partial<Response> = {
        locals: jest.fn
      }

      const mockNext: Partial<NextFunction> = jest.fn();

      checkEnvSettings(undefined, mockResponse as Response, mockNext as NextFunction);
      expect(mockResponse.locals).toHaveProperty('user', {
        name: 'test name',
        token : 'test token'
      });
      expect(mockResponse.locals).toHaveProperty('products', {
        resourceApiBaseUrl: 'resource base url'
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
