import { Router } from 'express';

import notes from './notes';

const router = Router();

export default (): Router => {
  notes(router);

  return router;
};