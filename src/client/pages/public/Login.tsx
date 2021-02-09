import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import apiService, { setStorage } from '../../utils/api-service';

const Login = (props: LoginProps) => {
	const history = useHistory();
	const [values, setValues] = useState<IFormState>({
		password: 'password123',
		email: 'luke@covalence.io'
	});

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const token = await apiService('/auth/login', 'POST', values);
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
						<button onClick={handleLogin} className="btn btn-primary shadow-sm mt-3">
							Login
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
}

interface LoginProps {}

export default Login;
