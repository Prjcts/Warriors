import { Router } from 'express';

const warriorRouter = Router();

warriorRouter
  .get('/register', async (req, res): Promise<void> => {

    res.render('register', {});
  })
  .post('/', (req, res): void => {
    res.render('hall-of-fame', {});
  });

export { warriorRouter };
