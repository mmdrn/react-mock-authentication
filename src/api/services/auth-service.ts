import axios from 'axios'
import IAuthService from '../interfaces/i-auth-service'
import { LoginRequest, LoginResponse } from '../interfaces/i-auth-service/types'

export default class AuthService implements IAuthService {
    private static instance: AuthService
    readonly resource: string = 'auth'

    /**
     * Returns the singleton instance of the AuthService class.
     *
     * @static
     * @returns {AuthService} The singleton instance.
     */
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService()
        }

        return AuthService.instance
    }

    async login(
        data: LoginRequest
    ): Promise<LoginResponse> {
        const formData = new FormData()

        formData.append('username', data.username)
        formData.append('password', data.password)

        const response = await axios.post(`/api/signin`, formData)
        return response.data
    }

    async getAuthUser(): Promise<LoginResponse> {
        const response = await axios.get(`/api/getAuthUser`)

        return response.data.user
    }
}
