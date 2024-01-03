import { AxiosError, AxiosResponse } from 'axios';
import storage from '../../storage';

export const axiosResponseFulfillInterceptor = (response: AxiosResponse) => {
	return Promise.resolve(response);
};

export const axiosResponseErrorInterceptor = (error: AxiosError) => {
	if (error.response) {
		switch (error.response.status) {
			case 401:
			case 403: {
				// TODO: replace below line with i18n and notify(toast).
				console.debug('your token is expired.');

				storage.clear();
				window.location.replace('/signin');
				return error.response;
			}
			case 404: {
				// TODO: replace bellow line with i18n and notify(toast).
				console.debug('your object or end-point not found.');
				throw new Error();
			}
			case 400: {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}

	switch (error.name) {
		case 'NetworkError': {
			// TODO: replace bellow line with i18n and notify(toast).
			console.debug('network error.');
			break;
		}
		case 'CanceledError': {
			// TODO: replace bellow line with i18n and notify(toast).
			console.debug('request canceled.');
			break;
		}
	}

	return Promise.reject(error);
};
