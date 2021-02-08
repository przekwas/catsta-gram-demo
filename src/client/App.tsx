import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Compose from './pages/Compose';
import Details from './pages/Details';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
