import { getProducts } from "../../../src/services/products/backend/productsService";
import axios from 'axios';
import { Product } from "../../../src/services/products/routes";

jest.mock('axios');

const getSpy = jest.spyOn(axios, 'get');
getSpy.mockResolvedValue({ data: [] as Product[], status: 200 });

describe('Products Service', () => {
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
    await getProducts();

    // Assert
    expect(getSpy).toHaveBeenCalledWith('api/resource/products', {
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
