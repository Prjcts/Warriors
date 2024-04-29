import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res): void => {
  res.render('home')
});

export { homeRouter };
