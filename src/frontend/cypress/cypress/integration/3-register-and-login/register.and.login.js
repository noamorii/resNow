describe('register and login', () => {

    it('Register new user and login him into app', () => {
        cy.visit('https://reservenow.herokuapp.com/')
        cy.get('#home div a .button-primary').should('have.text', 'Try now!')
        cy.get('#home div a .button-primary').click()


        cy.visit('https://reservenow.herokuapp.com/register')
        let name = makeid(10);
        let password = makeid(12)  + '1';
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(1)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(2)').type(name + '@gmail.com')
        cy.get('#root div div form div:nth-child(2) div:nth-child(1) label:nth-child(3)').type(password)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(1)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(2)').type(name)
        cy.get('#root div div form div:nth-child(2) div:nth-child(2) label:nth-child(3)').type(password)
        cy.get('button').click()

        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type(name)
        cy.get('form label:nth-child(3)').type(password)
        cy.get('button').click()

    })
})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}