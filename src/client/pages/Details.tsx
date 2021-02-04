import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiService from '../utils/api-service';
import { IPost } from '../utils/types';

import PostCard from '../components/PostCard';

const Details = (props: DetailsProps) => {
	const { postid } = useParams<{ postid: string }>();
	const [post, setPost] = useState<IPost>(null);

	useEffect(() => {
		apiService(`/api/posts/${postid}`)
			.then(post => setPost(post));
	}, [postid]);

	return (
		<main className="container">
			<section className="row mt-3">{post && <PostCard fullSize post={post} />}</section>
		</main>
	);
};

interface DetailsProps {}

export default Details;
