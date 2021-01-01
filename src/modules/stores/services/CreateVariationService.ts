import Service from '@shared/core/Service';
import Variations, {
  VariationsValues,
} from '../infra/mongoose/schemas/Variations';

interface Request {
  name: string;
  required: boolean;
  maxOptions?: number;
  allowRepeatedValues?: boolean;
  values: VariationsValues[];
}

class CreateVariationService implements Service<Request, void> {
  async execute({
    name,
    required,
    values,
    allowRepeatedValues,
    maxOptions,
  }: Request): Promise<void> {
    await Variations.create({
      name,
      required,
      values,
      allowRepeatedValues,
      maxOptions,
    });
  }
}

export default CreateVariationService;
