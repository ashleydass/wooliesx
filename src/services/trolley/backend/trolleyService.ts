import axios from 'axios';
import { Trolley } from '../routes';

export const calculateTrolleyTotal = async (trolley: Trolley): Promise<number> => {
  const {
    TOKEN: token,
    RESOURCE_API_BASE_URL: resourceApiBaseUrl
  } = process.env;

  try {
    const response = await axios({
      url: 'api/resource/trolleyCalculator',
      data: trolley,
      baseURL: resourceApiBaseUrl,
      method: 'post',
      params: {
        token
      }
    });

    if (response.status === 200) {
      return response.data as number;
    }

    throw `Unexpected response status: ${response.status}`;
  } catch (error) {
    console.error('Error occured when calling /api/resource/trolleyCalculator endpoint', error);
    throw 'Internal Server Error';
  }
};
