import React from 'react'
import Button from './index'

describe('Button component', () => {
    it('renders a default button with correct properties', () => {
        // Render the component in the test environment
        cy.mount(<Button>Click me</Button>)

        // Assert button properties
        cy.get('button').should('have.text', 'Click me')
        cy.get('button').should('have.class', 'bg-blue-500 hover:bg-blue-700 text-white') // Default status "info"
        cy.get('button').should('have.attr', 'type', 'button') // Default button type
    })

    it('renders buttons with different statuses', () => {
        cy.mount(<Button status="success">Success</Button>)
        cy.get('button').should('have.class', 'bg-green-500 hover:bg-green-700 text-white')

        cy.mount(<Button status="danger">Danger</Button>)
        cy.get('button').should('have.class', 'bg-red-500 hover:bg-red-700 text-white')

        // ... tests for other statuses
    })

    it('renders a loading button', () => {
        cy.mount(<Button loading>Loading...</Button>)
        cy.get('button').should('have.class', 'animate-pulse cursor-progress')
    })

    it('renders a button with a custom class', () => {
        cy.mount(<Button className="my-custom-class">Custom Button</Button>)
        cy.get('button').should('have.class', 'my-custom-class')
    })
})
