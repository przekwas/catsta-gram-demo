import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import apiService from '../../utils/api-service';
import { errorHandler } from '../../utils/error-handler';

const Compose = (props: ComposeProps) => {
	const history = useHistory();
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [uploadFile, setUploadFile] = useState<File>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploadFile(e.target.files[0]);
	};

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!uploadFile || !values.caption) return;
		try {
			
			const newImagePost = new FormData();
			newImagePost.append('image', uploadFile);
			newImagePost.append('caption', values.caption);
			
			fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'multipart/form-data'
				},
				body: newImagePost
			})
			.then(result => history.push(`/posts/${result.id}/details`))

			// history.push(`/posts/${result.id}/details`);
		} catch (error) {
			errorHandler(error);
		}
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-8">
					<form className="form-group border rounded shadow p-3">
						<div className="custom-file mb-2">
							<label htmlFor="formFile" className="custom-file-label">
								upload photo
							</label>
							<input
								type="file"
								className="custom-file-input"
								id="formFile"
								onChange={handleFileChange}
							/>
						</div>
						<div>
							{uploadFile && (
								<img
									className="image-preview"
									src={`${URL.createObjectURL(uploadFile)}`}
									alt="upload preview"
								/>
							)}
						</div>
						{/* <label>photo_url</label>
						<input
							name="photo_url"
							value={values.photo_url || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<small className="text-muted d-block mb-2">
							host the image yourself lol
						</small> */}
						<label>caption</label>
						<textarea
							name="caption"
							value={values.caption || ''}
							onChange={handleChanges}
							className="form-control"
							rows={10}
						/>
						<small className="d-block">{values.caption?.length || 0} / 144</small>
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
