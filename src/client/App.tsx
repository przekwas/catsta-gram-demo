import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

import PrivateRoute from './components/PrivateRoute';
import Compose from './pages/private/Compose';
import Details from './pages/public/Details';
import Edit from './pages/private/Edit';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import NotFound from './pages/public/NotFound';
import Profile from './pages/private/Profile';
import Register from './pages/public/Register';
import Navbar from './components/Navbar';
import Search from './pages/public/Search';

const App = (props: AppProps) => {
	return (
		<Router history={history}>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/posts/:postid/details">
					<Details />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<Route exact path="/posts/search">
					<Search />
				</Route>
				<PrivateRoute exact path="/posts/:postid/edit">
					<Edit />
				</PrivateRoute>
				<PrivateRoute exact path="/posts/add">
					<Compose />
				</PrivateRoute>
				<PrivateRoute exact path="/profile">
					<Profile />
				</PrivateRoute>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
};

interface AppProps {}

export default App;
