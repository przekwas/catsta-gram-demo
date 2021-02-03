import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/:postid', async (req, res) => {
	try {
		const postid = req.params.postid;
		const [post] = await db.posts.one(postid);
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

router.get('/', async (req, res) => {
	try {
		const posts = await db.posts.all();
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

router.post('/', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const newPost = req.body;
	try {
		newPost.id = uuidv4();
		newPost.user_id = req.user.id;
		await db.posts.insert(newPost);
		res.json({ message: 'new post inserted', id: newPost.id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

export default router;
