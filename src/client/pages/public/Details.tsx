import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiService from '../../utils/api-service';
import { IPost, IComment } from '../../utils/types';

import PostDetails from '../../components/PostDetails';

const Details = (props: DetailsProps) => {
	const { postid } = useParams<{ postid: string }>();
	const [post, setPost] = useState<IPost>(null);
	const [comments, setComments] = useState<IComment[]>(null);
	const [content, setContent] = useState<string>('');

	useEffect(() => {
		let postDetails: IPost = null;
		apiService(`/api/posts/${postid}`)
			.then(post => {
				postDetails = post;
				return apiService(`/api/comments/posts/${postid}`);
			})
			.then(comments => {
				setComments(comments);
				setPost(postDetails);
			});
	}, [postid]);

	useEffect(() => {
		const commentPoll = setInterval(async () => {
			const comments = await apiService(`/api/comments/posts/${postid}`);
			setComments(comments);
		}, 60000);

		return () => clearInterval(commentPoll);
	}, []);

	const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await apiService('/api/comments', 'POST', { content, post_id: postid });
		const comments = await apiService(`/api/comments/posts/${postid}`);
		setComments(comments);
		setContent('');
	};

	return (
		<main className="container">
			<section className="row mt-3">{post && <PostDetails post={post} />}</section>
			<section className="row justify-content-center mt-3">
				<div className="col-md-5 order-2 order-md-1">
					<form className="form-group bg-white border p-3">
						<label htmlFor="comment content">Comment</label>
						<textarea
							value={content}
							onChange={e => setContent(e.target.value)}
							rows={5}
							className="form-control"
						/>
						<button onClick={handleAddComment} className="btn btn-primary mt-2">
							Add Comment
						</button>
					</form>
				</div>
				<div className="col-md-7 order-1 order-md-2">
					<ul className="list-group">
						{comments?.map(comment => (
							<li key={comment.id} className="list-group-item">
								<small className="font-weight-bold d-block mb-2">
									@{comment.username}
								</small>
								<p>{comment.content}</p>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

interface DetailsProps {}

export default Details;
