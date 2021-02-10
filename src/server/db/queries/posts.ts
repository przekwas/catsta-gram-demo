import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const all = () =>
	Query(
		`
		SELECT 
    		posts.*, users.username, COUNT(comments.id) AS num_of_comments
		FROM
    		posts
        		JOIN
    		users ON users.id = posts.user_id
        		LEFT JOIN
    		comments ON comments.post_id = posts.id
		GROUP BY posts.id
		ORDER BY posts.created_at DESC;
		`
	);
const one = (id: string) =>
	Query(
		'SELECT posts.*, users.username FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ?',
		[id]
	);
const insert = (newPost: any) => Query<MySQLResponse>('INSERT INTO posts SET ?', newPost);
const find = (column: string, value: string | number) =>
	Query<PostsTable[]>('SELECT * FROM posts WHERE ?? = ?', [column, value]);
const destroy = (id: string, user_id: string) =>
	Query<MySQLResponse>('DELETE FROM posts WHERE id = ? AND user_id = ?', [id, user_id]);

const update = (editedPost: any, id: string, user_id: string) =>
	Query('UPDATE posts SET ? WHERE id = ? AND user_id = ?', [editedPost, id, user_id]);

const search = (term: string) =>
	Query(
		'SELECT posts.*, users.username FROM posts JOIN users ON users.id = posts.user_id WHERE posts.caption LIKE ?',
		[`%${term}%`]
	);

export default {
	all,
	one,
	insert,
	find,
	destroy,
	update,
	search
};
