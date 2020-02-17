import { Router } from 'express';
import request from 'supertest';
import * as axios from 'axios';
import dotenv from 'dotenv';
import { initialiseRouter } from './initialiser';
import { Trolley } from '../../../src/services/trolley/routes';

jest.mock('axios');

dotenv.config();

jest.spyOn(axios, 'default').mockResolvedValue(Promise.resolve(({ data: 100, status: 200 })) as axios.AxiosPromise<number>);

describe('Trolley routes', () => {
  let router: Router;

  beforeEach(() => {
    router = initialiseRouter();
  });

  describe('POST /api/trolleyTotal', () => {
    it('should return success response', async () => {
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
      const response = await request(router)
        .post('/api/trolleyTotal')
        .type('form')
        .send(trolley);

      expect(response.status).toEqual(200);
    });
  });
});
