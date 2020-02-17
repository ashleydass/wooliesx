import { Request, Response } from 'express';
import { Route } from '../type';
import checkSortOptionParam from '../../middleware/checkSortOptionParam';
import { getProductsSorted } from './productsController';
import checkEnvSettings from '../../middleware/checkEnvSettings';

export type Product = {
  name: string;
  price: number;
  quantity: number;
};

export type ShopperHistory = {
  customerId: number,
  products: Product[]
}

export default [
  {
    path: '/api/products/sort',
    method: 'get',
    handler: [
      checkEnvSettings,
      checkSortOptionParam,
      async (req: Request, res: Response): Promise<void> => {
        try {
          const { sortOption = 'Low' }: { sortOption?: string } = req.query;

          const productsSorted = await getProductsSorted(sortOption);
          res.json(productsSorted);
        } catch (error) {
          res.status(500).send({
            error: {
              message: error
            }
          });
        }
      }
    ]
  }
] as Route[];
