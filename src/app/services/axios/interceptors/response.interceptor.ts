import { AxiosError, AxiosResponse } from 'axios'
import storage from '../../storage'

export const axiosResponseFulfillInterceptor = (response: AxiosResponse) => {
    return Promise.resolve(response)
}

export const axiosResponseErrorInterceptor = (error: AxiosError) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
            case 403: {
                storage.clear()
                window.location.replace('/signin')
                return Promise.reject(error)
            }
            case 400:
            case 404: {
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }

    switch (error.name) {
        case 'NetworkError': {
            console.debug('network error.')
            break
        }
        case 'CanceledError': {
            console.debug('request canceled.')
            break
        }
    }

    return Promise.reject(error)
}
