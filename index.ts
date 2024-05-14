import express, {static as eStatic, urlencoded} from 'express';
import 'express-async-errors';
import {engine} from 'express-handlebars';
import methodOverride from 'method-override';
import {join} from 'path';
import {homeRouter} from './routes/home';
import {warriorRouter} from './routes/warrior';
import {arenaRouter} from './routes/arena';
import {hallOfFameRouter} from './routes/hallOfFame';
import {handleError} from './utils/errors';
import './utils/db';

const app = express();

app.use(express.json());

app.use(methodOverride('_override'));
app.use(
	urlencoded({
		extended: true,
	}),
);
app.use(eStatic(join(__dirname, 'public')));

app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		// helpers: ???
	}),
);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);


app.use(handleError);

app.listen(3008, 'localhost', () => {
	console.log('App is listening on http://localhost:3008');
});
