describe('create unregistred user for reservation', () => {

    it('Create unregistred user for reservation', () => {
        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type('Tester1')
        cy.get('form label:nth-child(3)').type('Tester1')
        cy.get('button').click()
        cy.wait(1000)
        cy.visit('https://reservenow.herokuapp.com/app/zakaznici')
        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > button').click()

        const firstName = makeid(10)
        const lastName = makeid(10)
        const username = firstName + 1
        const email = username + '@gmail.com'

        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > div > div > form > div:nth-child(1) > div > label:nth-child(1) > input').type(firstName)
        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > div > div > form > div:nth-child(1) > div > label:nth-child(2) > input').type(lastName)
        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > div > div > form > div:nth-child(1) > div > label:nth-child(3) > input').type(username)
        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > div > div > form > div:nth-child(1) > div > label:nth-child(4) > input').type(email)
        cy.get('#root > div > div > div.CustomersPage_buttonContainer__\\+RoP3 > div > div > form > button').click()

        //TODO

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