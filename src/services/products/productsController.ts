import { getProducts } from './backend/productsService';
import _ from 'lodash';
import { Product } from './routes';

export const getProductsSorted = async (sortOption: string): Promise<Product[]> => {
  const products: Product[] = await getProducts();

  switch (sortOption) {
    case 'High':
      return _.sortBy(products, 'price').reverse();
    case 'Ascending':
      return _.sortBy(products, 'name');
    case 'Descending':
      return _.sortBy(products, 'name').reverse();
    case 'Low':
    default:
      return _.sortBy(products, 'price');
  }
};
