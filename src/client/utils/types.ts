export interface IPost {
	id: string;
	user_id: string;
	photo_url: string;
	caption: string;
	created_at: string;
	username: string;
}

export interface IProfileInfo {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	is_visible: string;
	created_at: Date;
}

export interface IProfilePosts {
	id: string;
	user_id: string;
	photo_url: string;
	caption: string;
	created_at: Date;
}
