import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Navbar = (props: NavbarProps) => {
	const history = useHistory();
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		const unlisten = history.listen(() => setShow(false));
		return () => unlisten();
	}, [history]);

	return (
		<nav className="shadow p-3 mb-1">
			<div className="d-flex justify-content-between align-items-center">
				<span className="font-weight-bold">Catstagram</span>
				<svg
					onClick={() => setShow(!show)}
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-menu-2"
					width="30"
					height="30"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<line x1="4" y1="6" x2="20" y2="6" />
					<line x1="4" y1="12" x2="20" y2="12" />
					<line x1="4" y1="18" x2="20" y2="18" />
				</svg>
			</div>
			{show && (
				<div className="d-flex flex-column align-items-md-end align-items-center justify-content-center">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/posts/search">Search</NavLink>
					<NavLink to="/posts/add">Compose</NavLink>
					<NavLink to="/profile">Profile</NavLink>
					<NavLink to="/login">Login</NavLink>
					<NavLink to="/register">Register</NavLink>
				</div>
			)}
		</nav>
	);
};

interface NavbarProps {}

export default Navbar;
