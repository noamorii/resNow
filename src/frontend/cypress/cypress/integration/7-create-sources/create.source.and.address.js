describe('create address and source', () => {

    it('Create unregistred user for reservation', () => {
        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type('Tester1')
        cy.get('form label:nth-child(3)').type('Tester1')
        cy.get('button').click()
        cy.wait(500)
        cy.visit('https://reservenow.herokuapp.com/app/zdroje')
        cy.get('div > button.button-primary').click()


        let name = 'test0'
        let city = makeid(10)
        let description = 'test0'

        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > label:nth-child(1) > input').type(name)
        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > label:nth-child(2) > input').type(description)
        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > div:nth-child(4) > label:nth-child(1) > input').type(city)
        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > div:nth-child(4) > label:nth-child(2) > input').type(makeid(10))
        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > div:nth-child(4) > label:nth-child(3) > input').type(10)
        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > div:nth-child(4) > label:nth-child(4) > input').type(12345)


        cy.get('#root > div > div > div.Sources_body__0jHB4 > div.ModalNew_modal__m2hhs > div > form > button').click()
        cy.wait(500)
        cy.contains(name)
        cy.contains(description)
        cy.visit('https://reservenow.herokuapp.com/app/zdroje')
        cy.get('#root > div > div > div.ResourcesPage_menu__9-ct6 > button:nth-child(2)').click()
        cy.wait(500)
        cy.contains(city)


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