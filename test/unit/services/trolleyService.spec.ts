import { calculateTrolleyTotal } from "../../../src/services/trolley/backend/trolleyService";
import * as axios from 'axios';
import { Trolley } from "../../../src/services/trolley/routes";

jest.mock('axios');

const postSpy = jest.spyOn(axios, 'default');
postSpy.mockResolvedValue(Promise.resolve(({ data: 100, status: 200 })) as axios.AxiosPromise<number>);

describe('Trolley Service', () => {
  it('should make a request to axios with correct params', async () => {
    // Arrange
    const token = 'test token';
    const resourceApiBaseUrl = 'base url';
    process.env = {
      ...process.env,
      TOKEN: token,
      RESOURCE_API_BASE_URL: resourceApiBaseUrl
    };

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

    // Act
    await calculateTrolleyTotal(trolley);

    // Assert
    expect(postSpy).toHaveBeenCalledWith({
      url: 'api/resource/trolleyCalculator',
      data: trolley,
      baseURL: resourceApiBaseUrl,
      method: 'post',
      params: {
        token
      }
    });
  });
});
