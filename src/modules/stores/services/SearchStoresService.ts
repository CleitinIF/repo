import Service from '@shared/core/Service';
import Store, { StoreDocument } from '../infra/mongoose/schemas/Store';

interface Request {
  search?: string;
  page: number;
  perPage: number;
}

interface Response {
  stores: StoreDocument[];
  totalCount: number;
}

class SearchStoresService implements Service<Request, Response> {
  async execute({ page, perPage }: Request): Promise<Response> {
    const stores = await Store.find()
      .select('-products')
      .limit(perPage)
      .skip(perPage * (page - 1));

    const totalCount = await Store.estimatedDocumentCount();

    return { stores, totalCount };
  }
}

export default SearchStoresService;
