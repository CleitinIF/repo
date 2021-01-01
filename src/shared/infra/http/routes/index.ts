import express from 'express';

import storeRouter from '@modules/stores/infra/http/routes/store';

const router = express.Router();

router.use('/stores', storeRouter);

export default router;
