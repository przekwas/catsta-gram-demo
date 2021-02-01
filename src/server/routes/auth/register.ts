import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateHash } from '../../utils/passwords';
import db from '../../db';

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = req.body;
	try {
        newUser.id = uuidv4();
        newUser.password = await generateHash(newUser.password);
        const result = await db.users.insert(newUser);
		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error: error.sqlMessage });
	}
});

export default router;


