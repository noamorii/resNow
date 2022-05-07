describe('customer pages linking', () => {

    beforeEach(() => {
        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type('Tester2')
        cy.get('form label:nth-child(3)').type('Tester2')
        cy.get('button').click()
    })

    it('Register new user and login him into app', () => {
        cy.get('.NavbarClient_leftSideMenu a:nth-child(3)').click()

    })
})