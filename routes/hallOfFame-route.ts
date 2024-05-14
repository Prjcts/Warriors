import {Request, Response, Router} from 'express';
import {Warrior} from '../models/warrior.record';

const hallOfFameRouter = Router();

hallOfFameRouter
	.get('/fame', async (req: Request, res: Response) => {
		const topTen = (await Warrior.getTop(5)).map((warrior, index) => (
			{
				place: index + 1,
				warrior,
			}
		));
		console.log(topTen);
		res.render('hall-of-fame/list', {
			topTen,
		});
	});

export {hallOfFameRouter};