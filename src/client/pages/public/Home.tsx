import * as React from 'react';
import { useState, useEffect } from 'react';
import { IPost } from '../../utils/types';
import apiService from '../../utils/api-service';

import PostCard from '../../components/PostCard';

const Home = (props: HomeProps) => {
	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		apiService('/api/posts').then(posts => setPosts(posts));
	}, []);

	return (
		<main className="container">
			<section className="row mt-3">
				<div className="col-md-4">
					<div className="border bg-white rounded shadow p-3 sticky-top">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
							magni? Soluta quia placeat odit, est ipsa ullam necessitatibus pariatur
							explicabo asperiores dolor dolore blanditiis, debitis ea tenetur maxime
							sunt sapiente. Totam, minima placeat eos facilis, quos saepe qui quas
							odit aliquam, consectetur quaerat praesentium minus impedit error nam et
							quasi! Debitis excepturi incidunt adipisci sed delectus! Hic modi
							aliquid deleniti.
						</p>
					</div>
				</div>
				<div className="col-md-4">
					{posts.map(post => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
				<div className="col-md-4">
					<div className="border bg-white rounded shadow p-3 sticky-top">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
							magni? Soluta quia placeat odit, est ipsa ullam necessitatibus pariatur
							explicabo asperiores dolor dolore blanditiis, debitis ea tenetur maxime
							sunt sapiente. Totam, minima placeat eos facilis, quos saepe qui quas
							odit aliquam, consectetur quaerat praesentium minus impedit error nam et
							quasi! Debitis excepturi incidunt adipisci sed delectus! Hic modi
							aliquid deleniti.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

interface HomeProps {}

export default Home;
