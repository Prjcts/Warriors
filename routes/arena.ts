import {Router} from 'express';
import {Warrior} from '../models/warrior.record';
import {ValidationError} from '../utils/errors';

const arenaRouter = Router();

arenaRouter
	.get('/fight-form', async (req, res) => {
		const warriors = await Warrior.listAll();
		res.render('arena/fight-form', {
			warriors,
		});
	})
	.post('/fight', async (req, res) => {
		const {Warrior1: Warrior1ID, Warrior2: Warrior2ID} = await req.body;
		
		if (Warrior1ID === Warrior2ID) {
			throw new ValidationError('You cannot choose 2 the same warriors!');
		}
		
		const warrior1 = await Warrior.getOne(Warrior1ID);
		const warrior2 = await Warrior.getOne(Warrior2ID);
		
		if (!warrior1) {
			throw new ValidationError(' warrior1 does not exist any more');
		}
		
		if (!warrior2) {
			throw new ValidationError(' warrior2 does not exist any more');
		}
		
		
		res.render('arena/fight', {
			Warrior2ID,
			Warrior1ID,
		});
	});

export {arenaRouter};
