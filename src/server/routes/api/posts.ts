import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/search', async (req, res) => {
	const term = req.query.term;
	try {
		const posts = await db.posts.search(term.toString());
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

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

router.delete('/:postid', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const postid = req.params.postid;
	const user_id = req.user.id;
	try {
		const result = await db.posts.destroy(postid, user_id);
		res.json({ message: 'post deleted', ...result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

router.put('/:postid', passport.authenticate('jwt'), async (req: ReqUser, res) => {
	const postid = req.params.postid;
	const user_id = req.user.id;
	const editedPost = req.body;
	try {
		const result = await db.posts.update(editedPost, postid, user_id);
		res.json({ message: 'post edited', ...result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

export default router;
