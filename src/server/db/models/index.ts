export interface UsersTable {
	id?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	email?: string;
	password?: string;
	is_visible?: 'y' | 'n';
	created_at?: Date;
}

export interface PostsTable {
	id?: string;
	user_id?: string;
	photo_url?: string;
	caption?: string;
	created_at?: Date;
}

export interface MySQLResponse {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	protocol41: boolean;
	changedRows: number;
}
