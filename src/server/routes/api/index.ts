import * as express from 'express';
import postsRouter from './posts';
import usersRouter from './users';
import commentsRouter from './comments';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);

export default router;