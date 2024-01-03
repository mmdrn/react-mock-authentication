const prefix = import.meta.env.VITE_REACT_APP_STORAGE_PREFIX + '.';

const get = (key: string) => {
	const value: string | null = localStorage.getItem(prefix + key);

	try {
		return value;
	} catch (error) {
		console.error(error);
	}

	return value;
};

const set = (key: string, value: string | object) => {
	if (typeof value === 'object') value = JSON.stringify(value);

	localStorage.setItem(prefix + key, value);
};

const clear = () => {
	localStorage.clear();
};

export default {
	prefix,
	get,
	set,
	clear,
};
