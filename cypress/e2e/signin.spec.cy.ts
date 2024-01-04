describe('Signin, Create new product, and Delete Product', () => {
    it('Visits signin page', () => {
        cy.visit(`/signin`)

        cy.get('button[type=submit]').as('submit-button')
        cy.get('form label:first-child').as('username-field')
        cy.get('form label:nth-child(2)').as('password-field')

        cy.get('h1').contains('Sign in to your account')
        cy.get('p').contains('Enter your username and password.')

        cy.get('@submit-button').click()
        cy.get('@username-field').get('div span').contains('Username is required.')
        cy.get('@password-field').get('div span').contains('Password is required.')

        cy.get('@username-field')
            .contains('Username')
            .get('input[type=text]')
            .clear()
            .type('wrong-username')
        cy.get('@submit-button').click()
        cy.get('@username-field').get('div span').should('not.be')

        cy.get('@password-field').contains('Password').get('input[type=password]').type('12345678')
        cy.get('@submit-button').click()
        cy.get('@username-field').get('div span').should('not.be')

        cy.get('@username-field').get('div span').contains('Wrong username or password.')

        cy.get('@username-field')
            .contains('Username')
            .get('input[type=text]')
            .clear()
            .type('mohammadrn')
        cy.get('@submit-button').click()
        cy.get('@username-field').get('div span').should('not.be')

        cy.get('@password-field').contains('Password').get('input[type=password]').type('12345678')
        cy.get('@submit-button').click()
        cy.get('@username-field').get('div span').should('not.be')

        cy.wait(2000)

        cy.get('div > div > div button[type=button]').contains('Create').as('create-product-button')
        cy.get('@create-product-button').click()

        cy.get('form#create-product-form').as('create-product-form')

        cy.get('@create-product-form').get('label:first-child').as('product-name-field')
        cy.get('@create-product-form').get('label:nth-child(2)').as('product-description-field')
        cy.get('@create-product-form').get('label:nth-child(3)').as('product-price-field')
        cy.get('@create-product-form').get('label:nth-child(4)').as('product-quantity-field')
        cy.get('@create-product-form')
            .get('button[type=submit]')
            .contains('Submit')
            .as('submit-create-product-button')

        cy.get('@submit-create-product-button').click()

        cy.get('@product-name-field').get('div span').contains('Name is required.')
        cy.get('@product-description-field').get('div span').contains('Description is required.')
        cy.get('@product-price-field').get('div span').contains('Price is required.')
        cy.get('@product-quantity-field').get('div span').contains('Quantity is required.')

        cy.get('@product-name-field').contains('Name').click().type('just a product name')
        cy.get('@product-description-field')
            .contains('Description')
            .click()
            .type('product description')
        cy.get('@product-price-field').contains('Price').click().type('q')
        cy.get('@product-quantity-field').contains('Quantity').click().type('q')

        cy.get('@submit-create-product-button').click()

        cy.get('@product-price-field').get('div span').contains('Price should be number.')
        cy.get('@product-quantity-field').get('div span').contains('Quantity should be number.')

        cy.get('@product-price-field').contains('Price').click().type('{backspace}1100')
        cy.get('@product-quantity-field').contains('Quantity').click().type('{backspace}20')

        cy.get('@submit-create-product-button').click()

        cy.wait(2000)

        cy.get('table#products-list-table').as('products-table')
        cy.get('@products-table').get('tbody tr:last-child').contains('just a product name')

        cy.wait(2000)
		cy.get('@products-table').get('tbody tr:last-child [title="delete"]').click()

        cy.get('form#delete-product-form').as('delete-product-form')
		cy.get('@delete-product-form').get('button[type=submit]').contains('Delete').click()

        cy.wait(2000)

        cy.get('@products-table').get('tbody tr:last-child').not('just a product name')


		
    })
})
