import Service from '@shared/core/Service';
import Product, { ProductDocument } from '../infra/mongoose/schemas/Product';

interface Request {
  search?: string;
  page: number;
  perPage: number;
}

interface Response {
  products: ProductDocument[];
  totalCount: number;
}

class SearchProductsService implements Service<Request, Response> {
  async execute({ page, perPage }: Request): Promise<Response> {
    const products = await Product.find()
      .limit(perPage)
      .skip(perPage * (page - 1));

    const totalCount = await Product.estimatedDocumentCount();

    return { products, totalCount };
  }
}

export default SearchProductsService;
