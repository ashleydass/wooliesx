import { getShopperHistory } from "../../../src/services/products/backend/shopperHistoryService";
import axios from 'axios';
import { ShopperHistory } from "../../../src/services/products/routes";

jest.mock('axios');

const getSpy = jest.spyOn(axios, 'get');
getSpy.mockResolvedValue({ data: [] as ShopperHistory[], status: 200 });

describe('Shopper History Service', () => {
  it('should make a request to axios with correct params', async () => {
    // Arrange
    const token = 'test token';
    const resourceApiBaseUrl = 'valid resouce base url';
    process.env = {
      ...process.env,
      TOKEN: token,
      RESOURCE_API_BASE_URL: resourceApiBaseUrl
    };

    // Act
    await getShopperHistory();

    // Assert
    expect(getSpy).toHaveBeenCalledWith('api/resource/shopperHistory', {
      params: {
        token
      },
      baseURL: resourceApiBaseUrl,
      headers: {
        accept: 'application/json'
      }
    });
  });
});
