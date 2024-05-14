import {Router} from 'express';
import {ValidationError} from '../utils/errors';

const homeRouter = Router();

homeRouter.get('/', (req, res): void => {
	res.render('home/home');
});

export {homeRouter};
