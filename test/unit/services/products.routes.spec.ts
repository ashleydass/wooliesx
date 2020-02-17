import routes, { Product } from '../../../src/services/products/routes';
import { Route, Handler } from '../../../src/services/type';
import checkSortOptionParam from '../../../src/middleware/checkSortOptionParam';
import { Request, Response } from 'express';
import * as productsController from '../../../src/services/products/productsController';
import checkEnvSettings from '../../../src/middleware/checkEnvSettings';

describe('Products routes', () => {
  it('should contain correct path and method', () => {
    const userRoute = (routes as Route[])[0];
    expect(userRoute).toMatchObject({
      path: '/api/products/sort',
      method: 'get'
    });
  });

  describe('Handlers', () => {
    const [
      realcheckEnvSettings,
      realcheckSortOptionParam,
      realResponseHandler
    ] = (routes as Route[])[0].handler as Handler[];

    it('should use realcheckEnvSettings as first middleware', () => {
      expect(realcheckEnvSettings).toBe(checkEnvSettings);
    });

    it('should use checkSortOptionParam as second middleware', () => {
      expect(realcheckSortOptionParam).toBe(checkSortOptionParam);
    });

    const sortOptions = [
      'Low',
      'High',
      'Ascending',
      'Descending'
    ];

    sortOptions
      .forEach(s => {
        describe(`When sortOption is ${s}`, () => {
          let getProductsSortedSpy;

          beforeEach(() => {
            getProductsSortedSpy = jest.spyOn(productsController, 'getProductsSorted');
            getProductsSortedSpy.mockResolvedValue([] as Product[]);
          });

          it(`should call productsController with sortOption ${s}`, async () => {
            const mockRequest = {
              query: {
                sortOption: s
              }
            };

            const mockResponse: Partial<Response> = {
              json: jest.fn()
            }

            await realResponseHandler(mockRequest as Request, mockResponse as Response, undefined);
            expect(getProductsSortedSpy).toHaveBeenCalledWith(s);
          });
        });
      });

    describe('Main request handler', () => {
      it('should return sorted products as json response', async () => {
        const products: Product[] = [{
          name: '',
          price: 0,
          quantity: 0
        }];

        jest.spyOn(productsController, 'getProductsSorted')
          .mockResolvedValue(Promise.resolve(products));

        const mockRequest = {
          query: {
            sortOption: 'Low'
          }
        };

        const mockResponse: Partial<Response> = {
          json: jest.fn()
        }

        await realResponseHandler(mockRequest as Request, mockResponse as Response, undefined);

        expect(mockResponse.json).toHaveBeenCalledWith(products);
      });
    });
  });
});
