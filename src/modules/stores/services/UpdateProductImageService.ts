import Service from '@shared/core/Service';
import Product from '../infra/mongoose/schemas/Product';

interface Request {
  productId: string;
  imageUrl: string;
}

class UpdateProductImageService implements Service<Request, void> {
  async execute({ imageUrl, productId }: Request): Promise<void> {
    await Product.findOneAndUpdate({
      imageUrl,
    })
      .where('_id')
      .equals(productId)
      .exec();
  }
}

export default UpdateProductImageService;
