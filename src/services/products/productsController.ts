import { getProducts } from './backend/productsService';
import _ from 'lodash';
import { Product, ShopperHistory } from './routes';
import { getShopperHistory } from './backend/shopperHistoryService';

export const getProductsSorted = async (sortOption: string): Promise<Product[]> => {
  const products: Product[] = await getProducts();

  switch (sortOption.toLowerCase()) {
    case 'high':
      return _.sortBy(products, 'price').reverse();
    case 'ascending':
      return _.sortBy(products, 'name');
    case 'descending':
      return _.sortBy(products, 'name').reverse();
    case 'recommended':
      return await sortByRecommended(products);
    case 'low':
    default:
      return _.sortBy(products, 'price');
  }
};

async function sortByRecommended(products: Product[]) {
  const shoppingHistory = await getShopperHistory();
  const customerProducts = _.reduce(
    shoppingHistory,
    (acc: Product[], sh: ShopperHistory) => [...acc, ...sh.products],
    []);
  const itemsCounts = _.countBy(customerProducts, 'name');
  const sortedProducts = _.sortBy(products, 'name');

  return _.map(
    _.sortBy(
      _.map(sortedProducts, p => ({
          product: p,
          count: itemsCounts[p.name] || 0
        })), ['count', 'name']).reverse()
    , d => d.product);
}
