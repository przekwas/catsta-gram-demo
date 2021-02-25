import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../utils/types';

const PostCard = ({ post }: PostCardProps) => {
	return (
		<div className="row">
			<div className="col">
				<div className="card shadow mb-2">
					<img src={post.photo_url} alt={post.caption} className="card-img-top" />
					<div className="card-body">
						<h4 className="card-title">
							<small className="text-muted">@{post.username}</small> {post.caption}
						</h4>
						<p className="card-text">
							{post.num_of_comments} comment{post.num_of_comments === 1 ? '' : 's'}
						</p>
						<div className="d-flex justify-content-end">
							<Link to={`/posts/${post.id}/details`} className="btn btn-primary">
								Get Details
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface PostCardProps {
	post: IPost;
}

export default PostCard;
