import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Route } from '../type';
import checkEnvSettings from '../../middleware/checkEnvSettings';

dotenv.config();

export default [
  {
    path: '/api/user',
    method: 'get',
    handler: [
      checkEnvSettings,
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
