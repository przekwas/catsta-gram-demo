import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../utils/types';

const PostCard = ({ post, fullSize }: PostCardProps) => {
	const colSize = fullSize ? 'col-md-12' : 'col-md-7';
	const buttonPlacement = fullSize ? 'justify-content-start' : 'justify-content-end';
	const buttonText = fullSize ? 'Go Back' : 'Details';
	const buttonPath = fullSize ? `/` : `/posts/${post.id}/details`;

	return (
		<div key={post.id} className={colSize}>
			<div className="card shadow mb-2">
				<img src={post.photo_url} alt={post.caption} className="card-img-top" />
				<div className="card-body">
					<h4 className="card-title">
						<small className="text-muted">@{post.username}</small> {post.caption}
					</h4>
					<div className={`d-flex ${buttonPlacement}`}>
						<Link to={buttonPath} className={`btn btn-${fullSize ? 'secondary' : 'primary'}`}>
							{buttonText}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

interface PostCardProps {
	post: IPost;
	fullSize?: boolean;
}

export default PostCard;
