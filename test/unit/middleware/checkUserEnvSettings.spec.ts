import checkUserEnvSettings from '../../../src/middleware/checkUserEnvSettings';
import { Response, NextFunction } from "express";

describe('Middleware: checkUserEnvSettings', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('When Env variables are not set', () => {
    it('should return 500 status', () => {
      process.env = {
        ...process.env,
        USER_NAME: undefined,
        TOKEN: undefined
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnValue({
          send: () => jest.fn()
        }),
      }

      const mockNext: Partial<NextFunction> = jest.fn();

      checkUserEnvSettings(undefined, mockResponse as Response, mockNext as NextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockNext as NextFunction).not.toHaveBeenCalled();
    });
  });

  describe('When Env variables are set', () => {
    it('should append user settings to res.locals', () => {
      process.env = {
        ...process.env,
        USER_NAME: 'test name',
        TOKEN: 'test token'
      };

      const mockResponse: Partial<Response> = {
        locals: jest.fn
      }

      const mockNext: Partial<NextFunction> = jest.fn();

      checkUserEnvSettings(undefined, mockResponse as Response, mockNext as NextFunction);
      expect(mockResponse.locals).toHaveProperty('user', {
        name: 'test name',
        token : 'test token'
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
