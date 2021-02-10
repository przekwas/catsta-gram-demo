import { Query } from '../';
import { MySQLResponse, CommentsTable, UsersTable } from '../models';

const allForPost = (postid: string) => Query<CommentsTable & UsersTable[]>(`
SELECT 
    comments.*,
    users.username 
FROM 
    comments
        JOIN
    users ON users.id = comments.user_id
WHERE comments.post_id = ?
ORDER BY created_at ASC
`, [postid]);

const insert = (newComment: any) => Query<MySQLResponse>('INSERT INTO comments SET ?', newComment)

export default {
	allForPost,
    insert
}