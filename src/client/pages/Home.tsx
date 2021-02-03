import * as React from 'react';
import { useState, useEffect } from 'react';
import { IPost } from '../utils/types';

import PostCard from '../components/PostCard';

const Home = (props: HomeProps) => {

	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		fetch('/api/posts')
		.then(r => r.json())
		.then(posts => setPosts(posts));
	}, []);

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				{posts.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</section>
		</main>
	);
};

interface HomeProps {}

export default Home;