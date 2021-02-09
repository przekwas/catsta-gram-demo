import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../utils/api-service';
import { IProfileInfo, IProfilePosts } from '../../utils/types';

const Profile = (props: ProfileProps) => {
	const [info, setInfo] = useState<IProfileInfo>(null);
	const [posts, setPosts] = useState<IProfilePosts[]>([]);

	useEffect(() => {
		apiService('/api/users/profile').then(result => {
			setInfo(result.profile);
			setPosts(result.posts);
		});
	}, []);

	const handleDelete = async (id: string) => {
		const result = await apiService(`/api/posts/${id}`, 'DELETE');
		if (result.affectedRows === 1) {
			const result = await apiService('/api/users/profile');
			setPosts(result.posts);
		}
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-4">
					<div className="card shadow">
						<div className="card-body">
							<h4 className="card-title">What up, {info?.username}!</h4>
						</div>
					</div>
				</div>
			</section>
			<section className="row justify-content-center mt-3">
				<div className="col-md-6">
					<ul className="list-group">
						{posts.map(post => (
							<li
								key={post.id}
								className="list-group-item d-flex align-items-center justify-content-between">
								<span>{post.id}</span>
								<div>
									<Link to={`/posts/${post.id}/edit`} className="btn btn-info mr-2">Edit</Link>
									<button
										onClick={() => handleDelete(post.id)}
										className="btn btn-danger">
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

interface ProfileProps {}

export default Profile;
