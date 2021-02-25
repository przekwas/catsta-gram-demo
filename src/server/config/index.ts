import * as dotenv from 'dotenv';

dotenv.config();

// config object
export default {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretKey: process.env.AWS_SECRET_KEY
    }
}