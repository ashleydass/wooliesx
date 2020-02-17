import axios from 'axios';
import { ShopperHistory } from '../routes';

export const getShopperHistory = async (): Promise<ShopperHistory[]> => {
  const {
    TOKEN: token,
    RESOURCE_API_BASE_URL: resourceApiBaseUrl
  } = process.env;

  try {
    const response = await axios.get('api/resource/shopperHistory', {
      params: {
        token
      },
      baseURL: resourceApiBaseUrl,
      headers: {
        accept: 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data as ShopperHistory[];
    }

    throw `Unexpected response status: ${response.status}`;
  } catch (error) {
    console.error('Error occured when calling /api/resource/shopperHistory endpoint', error);
    throw 'Internal Server Error';
  }
};
