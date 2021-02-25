import * as express from 'express';
import db from '../../db';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { ReqUser } from '../../utils/types';

const router = express.Router();

router.get('/profile', tokenCheck, async (req: ReqUser, res) => {
    try {
		const userid = req.user.id;
		const [profile] = await db.users.one(userid);
        const posts = await db.posts.find('user_id', userid);
        delete profile.password;
		res.json({ profile, posts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error: error.message });
	}
});

export default router;