import checkSortOptionParam from '../../../src/middleware/checkSortOptionParam';
import { Request, Response } from "express";

describe('Middleware: checkSortOptionParam', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('When sortOption is not provided', () => {
    it('should use default sortOption: Low', () => {
      const mockRequest: Partial<Request> = {
        query: jest.fn().mockReturnValue({
          sortOption: undefined
        })
      };
      const mockResponse: Partial<Response> = {
        locals: {}
      };
      const mockNext = jest.fn();

      checkSortOptionParam(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.locals).toMatchObject({
        sortOption: 'Low'
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('When invalid sortOption is provided', () => {
    it('should send 400 - Bad Request status response', () => {
      const mockRequest: Partial<Request> = {
        query: {
          sortOption: 'Invalid sort option'
        }
      };
      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnValue({
          send: jest.fn()
        })
      };
      const mockNext = jest.fn();

      checkSortOptionParam(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('When valid sortOption "High" is provided', () => {
    it('should progress to next request handler', () => {
      const mockRequest: Partial<Request> = {
        query: {
          sortOption: 'High'
        }
      };
      const mockResponse: Partial<Response> = {
        locals: {}
      };
      const mockNext = jest.fn();

      checkSortOptionParam(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.locals).toMatchObject({
        sortOption: 'High'
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
