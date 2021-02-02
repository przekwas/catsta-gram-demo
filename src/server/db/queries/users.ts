import { Query } from '../';
import { MySQLResponse, UsersTable } from '../models';

const insert = (newUser: any) => Query<MySQLResponse>('INSERT INTO users SET ?', newUser);
const find = (column: string, value: string | number) => Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

export default {
    insert,
    find
}