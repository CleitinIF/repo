import Service from '@shared/core/Service';
import { deepMerge } from '@shared/utils/deepMerge';

import Store from '../infra/mongoose/schemas/Store';

import Variations, {
  VariationsDocument,
} from '../infra/mongoose/schemas/Variations';

interface Request {
  name: string;
  value: number;
  variations: any[];
  storeId: string;
}

class CreateProductService implements Service<Request, void> {
  async execute({ name, value, variations, storeId }: Request): Promise<void> {
    let _variations: VariationsDocument[] = [];
    const variationsIds = variations.map((variation) => variation.id);

    const store = await Store.findById(storeId);

    if (!store) {
      throw new Error("This storeId doesn't exist");
    }

    await Store.updateMany({
      products: [],
    }).exec();

    if (variations) {
      _variations = await Variations.find()
        .where('_id')
        .in(variationsIds)
        .exec();

      variations.forEach((variation) => {
        const _variation = _variations.find(
          (_variation) => _variation.id === variation.id,
        );

        if (_variation) {
          if (Object.keys(variation).length > 1) {
            _variation.modified = true;
          }
          deepMerge(_variation, variation);
        }
      });
    }

    await store
      .updateOne({
        $push: {
          products: {
            name,
            value,
            variations: _variations,
          } as any,
        },
      })
      .exec();
  }
}

export default CreateProductService;
