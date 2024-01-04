import axios from 'axios'
import {
    axiosRequestErrorInterceptor,
    axiosRequestFulfillInterceptor
} from './interceptors/request.interceptor'
import {
    axiosResponseErrorInterceptor,
    axiosResponseFulfillInterceptor
} from './interceptors/response.interceptor'

class AxiosSetup {
    constructor() {
        this.setDefaults()
        this.setInterceptors()
    }

    setDefaults = () => {
        axios.defaults.timeout = 30 * 1000
        axios.defaults.baseURL = '/'
    }

    setInterceptors = () => {
        axios.interceptors.request.use(axiosRequestFulfillInterceptor, axiosRequestErrorInterceptor)
        axios.interceptors.response.use(
            axiosResponseFulfillInterceptor,
            axiosResponseErrorInterceptor
        )
    }
}

const instance = new AxiosSetup()

export default instance
