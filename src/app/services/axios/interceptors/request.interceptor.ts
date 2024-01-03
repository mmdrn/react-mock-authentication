import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import storage from './../../storage';

export const axiosRequestFulfillInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const token = storage.get('access_token') || '';
	config.headers['Authorization'] = config?.headers?.Authorization ? config.headers.Authorization : `Bearer ${token}`;

	return config;
};

export const axiosRequestErrorInterceptor = (error: AxiosError) => {
	if (axios.isCancel(error)) {
		console.debug('request cancelled.');
	}

	return Promise.reject(error);
};
