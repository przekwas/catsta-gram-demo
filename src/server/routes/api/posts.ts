import * as express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json('test post router');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'i suck at code!', error });
    }
});

export default router;