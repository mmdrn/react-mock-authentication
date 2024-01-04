import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: process.env['E2E_HOST'] || 'http://localhost:4558',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite'
        }
    }
})
