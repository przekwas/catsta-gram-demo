import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import apiService from '../../utils/api-service';

const Compose = (props: ComposeProps) => {
	const history = useHistory();
	const [values, setValues] = useState<{ [key: string]: string }>({});

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!values.photo_url || !values.caption) return;
		const result = await apiService('/api/posts', 'POST', values);
		history.push(`/posts/${result.id}/details`);
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
						<button onClick={handleSubmit} className="btn btn-primary shadow-sm mt-3">
							Post Dat Shit
						</button>
					</form>
				</div>
			</section>
		</main>
	);
};

interface ComposeProps {}

export default Compose;
