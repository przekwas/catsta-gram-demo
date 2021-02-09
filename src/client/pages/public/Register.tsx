import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import apiService, { setStorage } from '../../utils/api-service';

const Register = (props: RegisterProps) => {
	const history = useHistory();
	const [values, setValues] = useState<IFormState>({
		username: 'tuna',
		first_name: 'luke',
		last_name: 'prz',
		password: 'password123',
		email: 'luke@covalence.io'
	});

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const token = await apiService('/auth/register', 'POST', values);
		setStorage(token);
		history.push('/profile');
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-3">
				<div className="col-md-6">
					<form className="form-group border rounded shadow p-3">
						<label>email</label>
						<input
							name="email"
							value={values.email || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<label>password</label>
						<input
							name="password"
							value={values.password || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<label>username</label>
						<input
							name="username"
							value={values.username || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<label>first_name</label>
						<input
							name="first_name"
							value={values.first_name || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<label>last_name</label>
						<input
							name="last_name"
							value={values.last_name || ''}
							onChange={handleChanges}
							className="form-control"
						/>
						<button onClick={handleRegister} className="btn btn-primary shadow-sm mt-3">
							Register
						</button>
					</form>
				</div>
			</section>
		</main>
	);
};

interface IFormState {
	email?: string;
	password?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
}

interface RegisterProps {}

export default Register;
