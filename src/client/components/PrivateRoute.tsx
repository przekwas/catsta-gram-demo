import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/api-service';

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
	const token = localStorage.getItem(TOKEN_KEY);
	if (token) {
		return <Route {...rest}>{children}</Route>;
	} else {
		return <Redirect to="/login" />;
	}
};

interface PrivateRouteProps {
	exact?: boolean;
	path: string;
	children: React.ReactNode;
}

export default PrivateRoute;
