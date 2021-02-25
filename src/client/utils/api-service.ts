import history from './history';

export const TOKEN_KEY = 'token';

const apiService = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
	const headers: any = {};
	const options: any = {
		method,
		headers
	};

	const token = localStorage.getItem(TOKEN_KEY);

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	if (body) {
		headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(body);
	}

	try {
		const res = await fetch(uri, options);

        if (!res.ok) {
            const serverStatus = await res.json();
            throw new Error(serverStatus.msg);
        }

		if (res.ok) {
			return <T>await res.json();
		}

	} catch (error) {
		throw error;
	}
};

export const setStorage = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export default apiService;
