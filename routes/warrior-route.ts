import { Router } from 'express';

const warriorRouter = Router();

warriorRouter
  .get('/add-form', async (req, res): Promise<void> => {

    res.render('add-form', {});
  })
  .post('/', (req, res): void => {
    res.render('hall-of-fame', {});
  });

export { warriorRouter };
