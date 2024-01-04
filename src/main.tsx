import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { worker } from './mocks/browser.ts'

if (import.meta.env.DEV) {
    worker.start({
        quiet: true
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
