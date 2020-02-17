import axios from 'axios';
import { Product } from '../routes';

export const getProducts = async (): Promise<Product[]> => {
  const {
    TOKEN: token,
    RESOURCE_API_BASE_URL: resourceApiBaseUrl
  } = process.env;

  try {
    const response = await axios.get('api/resource/products', {
      params: {
        token
      },
      baseURL: resourceApiBaseUrl,
      headers: {
        accept: 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data as Product[];
    }

    throw `Unexpected response status: ${response.status}`;
  } catch (error) {
    console.error('Error occured when calling /api/resource/products endpoint', error);
    throw 'Internal Server Error';
  }
};
