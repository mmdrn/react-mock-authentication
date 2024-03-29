import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'
import Dashboard from './routes/dashboard'
import AuthenticationLayout from './layouts/auth'
import Signin from './routes/auth/signin'
import Products from './routes/products'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createContext, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import './services/axios'

const queryClient = new QueryClient()

export type Theme = {
    sidebar: 'collapsed' | 'expanded'
}
export type GlobalTheme = {
    theme: Theme
    setTheme?: (theme: Theme) => void
}

export const GlobalThemeContext = createContext<GlobalTheme>({
    theme: {
        sidebar: 'expanded'
    }
})

function App() {
    const [theme, setTheme] = useState<Theme>({
        sidebar: 'expanded'
    })

    return (
        <BrowserRouter>
            <ToastContainer position="bottom-left" />

            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <GlobalThemeContext.Provider
                    value={{
                        theme,
                        setTheme
                    }}
                >
                    <div className="App flex items-stretch min-h-screen bg-gray-50">
                        <Routes>
                            {/* auth protected routes */}
                            <Route path="/dashboard" element={<DashboardLayout />}>
                                <Route path="" element={<Dashboard />} />
                                <Route path="products" element={<Products />} />
                            </Route>

                            {/* public routes */}
                            <Route path="" element={<AuthenticationLayout />}>
                                <Route path="" element={<Navigate to="/signin" />} />
                                <Route path="/signin" element={<Signin />} />
                            </Route>
                        </Routes>
                    </div>
                </GlobalThemeContext.Provider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
