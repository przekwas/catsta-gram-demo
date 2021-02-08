import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiService from '../utils/api-service';
import { IPost } from '../utils/types';

const Edit = (props: EditProps) => {
	const { postid } = useParams<{ postid: string }>();

	const [values, setValues] = useState<any>({});

	useEffect(() => {
		apiService(`/api/posts/${postid}`).then(post => {
			setValues({
				caption: post.caption,
				photo_url: post.photo_url
			})
		});
	}, [postid]);

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-8">
					<form className="form-group border rounded shadow p-3">
						<label>photo_url</label>
						<input
							name="photo_url"
							value={values.photo_url || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<small className="text-muted d-block mb-2">host the image yourself lol</small>
						<label>caption</label>
						<textarea
							name="caption"
							value={values.caption || ''}
							onChange={handleChanges}
							className="form-control"
							rows={10}
						/>
						<small className="d-block">{values.caption?.length || 0 } / 144</small>
						<button className="btn btn-primary shadow-sm mt-3">
							Post Dat Shit
						</button>
					</form>
				</div>
			</section>
		</main>
	);
};

interface EditProps {}

export default Edit;
