import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Route } from '../type';
import checkUserEnvSettings from '../../middleware/checkUserEnvSettings';

dotenv.config();

export default [
  {
    path: '/api/user',
    method: 'get',
    handler: [
      checkUserEnvSettings,
      async (_: Request, res: Response) => {
        const { user: { name, token }} = res.locals;
        res.json({
          name,
          token
        });
      }
    ]
  }
] as Route[];
