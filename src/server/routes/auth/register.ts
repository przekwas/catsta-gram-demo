import * as express from 'express';
import db from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { generateHash } from '../../utils/passwords';
import { signToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', async (req, res) => {
	const newUser = req.body;
	try {
		newUser.id = uuidv4();
		newUser.password = await generateHash(newUser.password);
		await db.users.insert(newUser);
		const token = signToken({ userid: newUser.id, email: newUser.email, username: newUser.username });
		res.json(token);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error: error.sqlMessage });
	}
});

export default router;

