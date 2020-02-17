import { Request, Response } from 'express';
import { Route } from '../type';
import { calculateTrolleyTotal } from './backend/trolleyService';

export type Trolley = {
  products: TrolleyProduct[],
  specials: TrolleySpecial[],
  quantities: TrolleyQuantity[]
}

type TrolleyProduct = {
  name: string,
  price: number
};

type TrolleyQuantity = {
  name: string,
  quantity: number
};

type TrolleySpecial = {
  quantities: TrolleyQuantity[],
  total: number
}

export default [
  {
    path: '/api/trolleyTotal',
    method: 'post',
    handler: async (req: Request, res: Response): Promise<void> => {
      try {
        const trolley = req.body as Trolley;
        const total = await calculateTrolleyTotal(trolley);

        res.status(200).send(total.toString());
      } catch (error) {
        res.status(500).send({
          error: {
            message: error
          }
        });
      }
    }
  }
] as Route[];
