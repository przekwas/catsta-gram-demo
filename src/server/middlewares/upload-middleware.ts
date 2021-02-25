import * as path from 'path';
import * as S3 from 'aws-sdk/clients/s3';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import config from '../config';

const s3 = new S3({
	apiVersion: '2006-03-01',
	region: 'us-east-2',
	credentials: {
		accessKeyId: config.aws.accessKeyId,
		secretAccessKey: config.aws.secretKey
	}
});

export const upload = multer({
	storage: multers3({
		s3,
		bucket: 'catsta-gram',
		acl: 'public-read',
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString() + path.extname(file.originalname));
		}
	})
});
