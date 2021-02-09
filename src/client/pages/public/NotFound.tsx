import * as React from 'react';

const NotFound = (props: NotFoundProps) => {
	return (
		<main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
			<h1>Route Not Found, idiot!</h1>
		</main>
	);
};

interface NotFoundProps {}

export default NotFound;