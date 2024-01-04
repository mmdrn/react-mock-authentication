import { server } from '../../src/mocks/node'
import AuthService from './../../src/api/services/auth-service'

describe('auth service', () => {
    beforeAll(() => {
        server.listen()
    })
    afterEach(() => {
        server.resetHandlers()
    })
    afterAll(() => {
        server.close()
    })

    describe('login', () => {
        it('should successfully login', async () => {
            const authService = AuthService.getInstance()
            const result = await authService.login({
                username: 'mohammadrn',
                password: '12345678'
            })

            console.debug('----------------->: ', result)
        })
    })
})
