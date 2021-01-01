import express from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';

import CreateStoreService from '@modules/stores/services/CreateStoreService';
import SearchStoresService from '@modules/stores/services/SearchStoresService';
import UpdateProductImageService from '@modules/stores/services/UpdateProductImageService';
import CreateProductService from '@modules/stores/services/CreateProductService';
import SearchProductsOfStoreService from '@modules/stores/services/SearchProductsOfStoreService';
import CreateVariationService from '@modules/stores/services/CreateVariationService';
import Variations from '../../mongoose/schemas/Variations';

const storeRouter = express.Router();

storeRouter.get('/', async (req, res) => {
  const { page, perPage = 20 } = req.query;

  const searchStores = new SearchStoresService();

  const { stores, totalCount } = await searchStores.execute({
    page: Number(page),
    perPage: Number(perPage),
  });

  res.header('X-Total-Count', String(totalCount));
  res.header('X-Total-Page', String(Math.ceil(totalCount / Number(perPage))));

  return res.json(stores);
});

storeRouter.post('/', async (req, res) => {
  const { name, address, deliveryFee, minimumOrderValue } = req.body;

  const createStore = new CreateStoreService();

  const store = await createStore.execute({
    address,
    name,
    deliveryFee,
    minimumOrderValue,
  });

  return res.json(store);
});

storeRouter.post(
  '/:storeId/products/:productId/image',
  multer(multerConfig).single('file'),
  async (req, res) => {
    const updateProductImage = new UpdateProductImageService();

    await updateProductImage.execute({
      productId: String(req.params.id),
      imageUrl: req.file.filename,
    });

    return res.sendStatus(200);
  },
);

storeRouter.get('/:storeId/products/', async (req, res) => {
  const { storeId } = req.params;

  const searchProducts = new SearchProductsOfStoreService();

  const { products } = await searchProducts.execute({
    storeId,
  });

  return res.json(products);
});

storeRouter.post('/:storeId/products/', async (req, res) => {
  const { storeId } = req.params;
  const { name, variations, value } = req.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    value,
    variations,
    storeId,
  });

  return res.json(product);
});

storeRouter.post('/:storeId/variations/', async (req, res) => {
  const { name, required, maxOptions, allowRepeatedValues, values } = req.body;

  const createVariation = new CreateVariationService();

  await createVariation.execute({
    name,
    required,
    values,
    allowRepeatedValues,
    maxOptions,
  });

  return res.sendStatus(200);
});

storeRouter.get('/:storeId/variations/', async (req, res) => {
  const data = await Variations.find();

  return res.json(data);
});

export default storeRouter;
