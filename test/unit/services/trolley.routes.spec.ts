import routes, { Trolley } from '../../../src/services/trolley/routes';
import { Route, Handler } from '../../../src/services/type';
import { Request, Response } from 'express';
import * as trolleyService from '../../../src/services/trolley/backend/trolleyService';

describe('Trolley routes', () => {
  it('should contain correct path and method', () => {
    const trolleyRoute = (routes as Route[])[0];
    expect(trolleyRoute).toMatchObject({
      path: '/api/trolleyTotal',
      method: 'post'
    });
  });

  describe('Handlers', () => {
    const realResponseHandler = (routes as Route[])[0].handler as Handler;

    describe('Main request handler', () => {
      it('should call calculateTrolleyTotal method', async () => {
        const trolley: Trolley = {
          "products": [
            {
              "name": "Test Product B",
              "price": 10
            }
          ],
          "specials": [
            {
              "quantities": [
                {
                  "name": "Test Product B",
                  "quantity": 20
                }
              ],
              "total": 50
            }
          ],
          "quantities": [
            {
              "name": "Test Product B",
              "quantity": 30
            }
          ]
        };

        const trolleyTotal = 123;

        jest.spyOn(trolleyService, 'calculateTrolleyTotal')
          .mockResolvedValue(Promise.resolve(trolleyTotal));

        const mockRequest = {
          body: JSON.stringify(trolley)
        };

        const mockSend = jest.fn();

        const mockResponse: Partial<Response> = {
          status: jest.fn().mockReturnValue({
            send: mockSend
          })
        }

        await realResponseHandler(mockRequest as Request, mockResponse as Response, undefined);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith(trolleyTotal.toString());
      });
    });
  });
});
