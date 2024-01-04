import { Fragment, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import AuthService from '../../../../api/services/auth-service'
import TextInput from '../../../components/text-input'
import Button from '../../../components/button'
import storage from '../../../services/storage'

const Signin = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [username_errors, setUsername_errors] = useState<string[] | null>(null)
    const [password, setPassword] = useState('')
    const [password_errors, setPassword_errors] = useState<string[] | null>(null)

    /**
     * Asynchronously handles user sign-in using the AuthService.
     *
     * @param {object} variables The input data for sign-in, including username and password.
     */
    const signinMutation = useMutation({
        mutationFn: async ({ username, password }: { username: string; password: string }) => {
            const service = AuthService.getInstance()
            return await service.login({
                username: username,
                password: password
            })
        },
        onSuccess: (data) => {
            if (data?.user) {
                storage.set('access_token', data.user.token as string)
                navigate('/dashboard/products')
            }
        },
        onError(error) {
            if (axios.isAxiosError(error) && error?.response?.data?.message) {
                setUsername_errors([error.response.data.message])
            } else {
                setUsername_errors(['An error occured, please try again later.'])
            }

            setPassword('')
        }
    })

    /**
     * Validates the provided username and password inputs.
     *
     * @param {string} username - The username to validate.
     * @param {string} password - The password to validate.
     *
     * @returns {boolean} - True if the username and password are both valid, false otherwise.
     */
    const handleValidation = (username: string, password: string): boolean => {
        let isValid = true

        setUsername_errors(null)
        setPassword_errors(null)

        if (!username) {
            isValid = false
            setUsername_errors(['Username is required.'])
        }

        if (!password) {
            isValid = false
            setPassword_errors(['Password is required.'])
        }

        return isValid
    }

    return (
        <Fragment>
            <div className="mb-6  flex flex-col items-center justify-start">
                <h1 className="text-slate-900 font-black text-xl truncate leading-10 text-center">
                    Sign in to your account
                </h1>
                <p className="mt-2 text-sm font-normal text-slate-500">
                    Enter your username and password.
                </p>
            </div>

            <form
                className="grid grid-cols-1 gap-y-6"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleValidation(username, password)
                        ? signinMutation.mutate({
                              username: username,
                              password: password
                          })
                        : null
                }}
            >
                <TextInput
                    title="Username"
                    value={username}
                    required
                    errors={username_errors}
                    disabled={signinMutation.isLoading}
                    loading={signinMutation.isLoading}
                    onChange={(value) => setUsername(value)}
                />
                <TextInput
                    title="Password"
                    value={password}
                    required
                    password
                    errors={password_errors}
                    disabled={signinMutation.isLoading}
                    loading={signinMutation.isLoading}
                    onChange={(value) => setPassword(value)}
                />

                <Button
                    type="submit"
                    status="success"
                    disabled={signinMutation.isLoading}
                    loading={signinMutation.isLoading}
                >
                    Signin
                </Button>
            </form>
        </Fragment>
    )
}

export default Signin
