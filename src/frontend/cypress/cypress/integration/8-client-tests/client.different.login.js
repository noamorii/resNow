let name = 'tClient';
let password = 'testClient0';

describe('create reservation', () =>
    it('create reservation', () => {
        cy.visit('https://reservenow.herokuapp.com/')
        cy.get('#home div a .button-primary').should('have.text', 'Register')
        cy.get('#home div a .button-primary').click()

        cy.visit('https://reservenow.herokuapp.com/register')
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(1)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(2)').type(name + '@gmail.com')
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(3)').type(password)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(1)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(2)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(3)').type(password)
        cy.get('#root > div > div > form > div:nth-child(2) > div.RegistrationPage_rightInputs__3V4sn > label.RegistrationPage_labelChoose__tSjYk').click()
        cy.get('button').click()

        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type(name)
        cy.get('form label:nth-child(3)').type(password)
        cy.get('button').click()
            cy.wait(2000)
        cy.contains('Your upcoming reservations')
    })
)