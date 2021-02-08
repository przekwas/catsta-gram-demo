import { Query } from '../';
import { MySQLResponse, UsersTable } from '../models';

const one = (userid: string) => Query<UsersTable[]>('SELECT * FROM users WHERE id = ?', [userid]);
const insert = (newUser: any) => Query<MySQLResponse>('INSERT INTO users SET ?', newUser);
const find = (column: string, value: string | number) => Query<UsersTable[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

export default {
    one,
    insert,
    find
}