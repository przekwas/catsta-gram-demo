import { Query } from '../';
import { MySQLResponse } from '../models';

const insert = (newUser: any) => Query<MySQLResponse>('INSERT INTO users SET ?', newUser);

export default {
    insert
}