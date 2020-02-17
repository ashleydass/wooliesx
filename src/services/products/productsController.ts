import { getProducts } from './backend/productsService';
import _ from 'lodash';
import { Product, ShopperHistory } from './routes';
import { getShopperHistory } from './backend/shopperHistoryService';

export const getProductsSorted = async (sortOption: string): Promise<Product[]> => {
  const products: Product[] = await getProducts();

  switch (sortOption) {
    case 'High':
      return _.sortBy(products, 'price').reverse();
    case 'Ascending':
      return _.sortBy(products, 'name');
    case 'Descending':
      return _.sortBy(products, 'name').reverse();
    case 'Recommended':
      const shoppingHistory = await getShopperHistory();
      const allProducts = _.reduce(
        shoppingHistory,
        (cum: Product[], sh: ShopperHistory) => [...cum, ...sh.products],
        []);
      const counts = _.fromPairs(
        _.sortBy(
          _.toPairs(
            _.countBy(allProducts, 'name')), 1).reverse());
      const sorted = _.keys(counts)
        .map(k => products.find(p => p.name === k));
      const missing = _.differenceBy(products, sorted, 'name')
      return [...sorted, ...missing];
    case 'Low':
    default:
      return _.sortBy(products, 'price');
  }
};
