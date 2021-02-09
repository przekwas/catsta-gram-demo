import * as React from 'react';
import { useState, useEffect } from 'react';
import { IPost } from '../../utils/types';
import apiService from '../../utils/api-service';

import PostCard from '../../components/PostCard';

const Search = (props: SearchProps) => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		apiService('/api/posts').then(posts => setPosts(posts));
	}, []);

	// todo: debouncing
	useEffect(() => {
		if (!searchTerm.length) return;
		apiService(`/api/posts/search?term=${searchTerm}`).then(posts => setPosts(posts));
	}, [searchTerm]);

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-4">
					<form className="form-group">
						<input
							placeholder="search term ..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="form-control"
						/>
					</form>
				</div>
			</section>
			<section className="row justify-content-center mt-3">
				{posts.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</section>
		</main>
	);
};

interface SearchProps {}

export default Search;
