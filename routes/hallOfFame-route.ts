import {Router} from 'express';

const hallOfFameRouter = Router();

hallOfFameRouter
	.get('/fame', (req, res): void => {
		res.render('hall-of-fame');
	});

export {hallOfFameRouter};
