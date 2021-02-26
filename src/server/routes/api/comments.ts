import * as express from 'express';
import db from '../../db';
import { v4 as uuidv4 } from 'uuid';
import { io } from '../../server';
import { tokenCheck } from '../../middlewares/auth-middlewares';
import { ReqUser } from '../../utils/types';

const router = express.Router();

// router.get('/search', async (req, res) => {
// 	const term = req.query.term;
// 	try {
// 		const posts = await db.posts.search(term.toString());
// 		res.json(posts);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: 'i suck at code!', error });
// 	}
// });

router.get('/posts/:postid', async (req, res) => {
	try {
		const postid = req.params.postid;
		const comments = await db.comments.allForPost(postid);
		res.json(comments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

// router.get('/', async (req, res) => {
// 	try {
// 		const posts = await db.posts.all();
// 		res.json(posts);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: 'i suck at code!', error });
// 	}
// });

router.post('/', tokenCheck, async (req: ReqUser, res) => {
	const newComment = req.body;
	try {
		newComment.id = uuidv4();
		newComment.user_id = req.user.id;
		await db.comments.insert(newComment);
		io.emit('newComment');
		res.json({ message: 'new comment inserted', id: newComment.id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

// router.delete('/:postid', tokenCheck, async (req: ReqUser, res) => {
// 	const postid = req.params.postid;
// 	const user_id = req.user.id;
// 	try {
// 		const result = await db.posts.destroy(postid, user_id);
// 		res.json({ message: 'post deleted', ...result });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: 'i suck at code!', error });
// 	}
// });

// router.put('/:postid', tokenCheck, async (req: ReqUser, res) => {
// 	const postid = req.params.postid;
// 	const user_id = req.user.id;
// 	const editedPost = req.body;
// 	try {
// 		const result = await db.posts.update(editedPost, postid, user_id);
// 		res.json({ message: 'post edited', ...result });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ message: 'i suck at code!', error });
// 	}
// });

export default router;
