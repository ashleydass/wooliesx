import * as productsService from '../../../src/services/products/backend/productsService';
import * as shopperHistoryService from '../../../src/services/products/backend/shopperHistoryService';
import { getProductsSorted } from '../../../src/services/products/productsController';

describe('Main request handler', () => {
  jest.spyOn(productsService, 'getProducts').mockResolvedValue(
    Promise.resolve([
      {
        name: 'Test Product A',
        price: 99.99,
        quantity: 0
      },
      {
        name: 'Test Product B',
        price: 101.99,
        quantity: 0
      },
      {
        name: 'Test Product C',
        price: 10.99,
        quantity: 0
      },
      {
        name: 'Test Product D',
        price: 5,
        quantity: 0
      },
      {
        name: 'Test Product F',
        price: 999999999999,
        quantity: 0
      }
    ])
  );

  describe('When sortOption is Low', () => {
    it('should return products sorted by Price from Low to High', async () => {
      const productsSorted = await getProductsSorted('Low');

      expect(productsSorted).toMatchObject([
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        }
      ]);
    });
  });

  describe('When sortOption is High', () => {
    it('should return products sorted by Price from High to Low', async () => {
      const productsSorted = await getProductsSorted('High');

      expect(productsSorted).toMatchObject([
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        }
      ]);
    });
  });

  describe('When sortOption is Ascending', () => {
    it('should return products sorted by Name from A - Z', async () => {
      const productsSorted = await getProductsSorted('Ascending');

      expect(productsSorted).toMatchObject([
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        }
      ]);
    });
  });

  describe('When sortOption is Descending', () => {
    it('should return products sorted by Name from Z - A', async () => {
      const productsSorted = await getProductsSorted('Descending');

      expect(productsSorted).toMatchObject([
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        }
      ]);
    });
  });

  describe('When sortOption is Recommended', () => {
    jest.spyOn(shopperHistoryService, 'getShopperHistory').mockResolvedValue(
      Promise.resolve([
        {
          'customerId': 123,
          'products': [
            {
              'name': 'Test Product A',
              'price': 99.99,
              'quantity': 3
            },
            {
              'name': 'Test Product B',
              'price': 101.99,
              'quantity': 1
            },
            {
              'name': 'Test Product F',
              'price': 999999999999,
              'quantity': 1
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              'name': 'Test Product A',
              'price': 99.99,
              'quantity': 2
            },
            {
              'name': 'Test Product B',
              'price': 101.99,
              'quantity': 3
            },
            {
              'name': 'Test Product F',
              'price': 999999999999,
              'quantity': 1
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              'name': 'Test Product C',
              'price': 10.99,
              'quantity': 2
            },
            {
              'name': 'Test Product F',
              'price': 999999999999,
              'quantity': 2
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              'name': 'Test Product A',
              'price': 99.99,
              'quantity': 1
            },
            {
              'name': 'Test Product B',
              'price': 101.99,
              'quantity': 1
            },
            {
              'name': 'Test Product C',
              'price': 10.99,
              'quantity': 1
            }
          ]
        }
      ]));
    it('should return products sorted by Recommended', async () => {
      const productsSorted = await getProductsSorted('Recommended');

      expect(productsSorted).toMatchObject([
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        }
      ]);});
  });
});
