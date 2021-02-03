import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const all = () => Query('SELECT posts.*, users.username FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC');
const one = (id: string) => Query('SELECT posts.*, users.username FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ?', [id]);
const insert = (newPost: any) => Query<MySQLResponse>('INSERT INTO posts SET ?', newPost);
const find = (column: string, value: string | number) =>
	Query<PostsTable[]>('SELECT * FROM posts WHERE ?? = ?', [column, value]);

export default {
	all,
	one,
	insert,
	find
};
