import {Router} from 'express';
import {Warrior} from '../models/warrior.record';
import {ValidationError} from '../utils/errors';

const warriorRouter = Router();

warriorRouter
	.get('/add-warrior-form', (req, res) => {
		
		res.render('warriors/add-warrior-form');
	})
	.post('/', async (req, res): Promise<void> => {
		const {agility, stamina, name, strength, defence} = req.body;
		if (await Warrior.isNameTaken(name)) {
			throw new ValidationError('This name is not available');
		}
		
		const warrior = new Warrior({
			...req.body,
			strength: Number(strength),
			defence: Number(defence),
			stamina: Number(stamina),
			agility: Number(agility),
			
			
		});
		const id = await warrior.insert();
		res.render('warriors/added', {
			id,
			// name: req.body.name,
			name: warrior.name,
		});
		// res.json(req.body);
	});

export {warriorRouter};
