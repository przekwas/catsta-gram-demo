import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../utils/types';

const PostDetails = ({ post }: PostDetailsProps) => {
	return (
		<>
			<div className="col-md-6">
				<img
					src={post.photo_url}
					alt={post.caption}
					style={{ width: '400px', height: 'auto ' }}
				/>
			</div>
			<div className="col-md-6">
				<p className="text-muted">@{post.username}</p> {post.caption}
				<div>
					<Link to="/" className="btn btn-secondary">
						Get Back
					</Link>
				</div>
			</div>
		</>
	);
};

interface PostDetailsProps {
	post: IPost;
}

export default PostDetails;
