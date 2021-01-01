import Service from '@shared/core/Service';
import Store, { StoreDocument } from '../infra/mongoose/schemas/Store';

interface Request {
  name: string;
  deliveryFee?: number;
  minimumOrderValue?: number;
  address: {
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

class CreateStoreService implements Service<Request, StoreDocument> {
  async execute({
    name,
    address,
    deliveryFee,
    minimumOrderValue,
  }: Request): Promise<StoreDocument> {
    return Store.create({
      address,
      name,
      deliveryFee,
      minimumOrderValue,
      products: [],
    });
  }
}

export default CreateStoreService;
