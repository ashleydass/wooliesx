import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Route } from '../type';

dotenv.config();

export default [
  {
    path: '/api/user',
    method: 'get',
    handler: async (_: Request, res: Response) => {
      const { USER_NAME: name, TOKEN: token } : {
        USER_NAME: string,
        TOKEN: string
      } = process.env as any;

      if (!name || !token) {
        res.status(500).send({
          error: {
            message: 'Invalid settings.'
          }
        });

        return;
      }

      res.json({
        name,
        token
      });
    }
  }
] as Route[];
