import Service from '@shared/core/Service';
import { ProductDocument } from '../infra/mongoose/schemas/Product';
import Store from '../infra/mongoose/schemas/Store';

interface Request {
  search?: string;
  storeId: string;
}

interface Response {
  products: ProductDocument[];
}

class SearchProductsOfStoreService implements Service<Request, Response> {
  async execute({ storeId }: Request): Promise<Response> {
    const store = await Store.findById(storeId).select('products -_id');

    if (!store) {
      throw new Error("This storeId doesn't exist");
    }

    const { products } = store;

    return { products };
  }
}

export default SearchProductsOfStoreService;
