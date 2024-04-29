import { Router } from 'express';

const arenaRouter = Router();

arenaRouter
  .get('/fight-form', (req, res): void => {
    res.render('arena');
  })
  .post('/fight', (req, res): void => {
    res.render('fight');
  });

export { arenaRouter };
