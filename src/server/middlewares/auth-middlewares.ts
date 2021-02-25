import * as passport from 'passport';
import { RequestHandler } from 'express';

export const tokenCheck: RequestHandler = (req, res, next) => {
	passport.authenticate('jwt', (err, user, info) => {
        if(err) {
            next(err);  
        }

        if (info?.message === 'No auth token') {
			return res.status(401).json({ msg: 'no token' });
		}

		if (info?.message === 'invalid signature') {
			return res.status(401).json({ msg: 'invalid token' });
		}

		if (info?.message === 'jwt expired') {
			return res.status(401).json({ msg: 'expired token' });
		}

		if (user) {
			req.user = user;
		}

		next();
	})(req, res, next);
};