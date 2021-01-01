import Service from '@shared/core/Service';

import SearchProductsOfStoreService from './SearchProductsOfStoreService';

interface Request {
  productId: string;
  imageUrl: string;
  storeId: string;
}

class UpdateProductImageService implements Service<Request, void> {
  async execute({ imageUrl, productId, storeId }: Request): Promise<void> {
    const searchProductsOfStore = new SearchProductsOfStoreService();

    const { products } = await searchProductsOfStore.execute({ storeId });

    const product = products.find((item) => item._id === productId);
    if (!product) {
      throw new Error("This productId doesn't exist");
    }

    product.imageUrl = imageUrl;

    await product.save();
  }
}

export default UpdateProductImageService;
