import {createPool} from 'mysql2/promise';

const pool = createPool({
	host: 'localhost',
	user: 'root',
	database: 'warriors',
	namedPlaceholders: true,
	decimalNumbers: true,
});

export {pool};
