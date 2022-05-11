describe('create event', () => {

    it('Create uevent', () => {
        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type('Tester1')
        cy.get('form label:nth-child(3)').type('Tester1')
        cy.get('button').click()
        cy.wait(500)
        cy.visit('https://reservenow.herokuapp.com/app/terminy')
        cy.get('#root > div > nav > div.NavbarClient_leftSideMenu__LcRjt > a.NavbarClient_active__5tyoo').click()
        cy.get('#root > div > div > div > div > div > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(3) > button.fc-myCustomButton-button.fc-button.fc-button-primary').click()
        cy.get('#sequence').click()
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset:nth-child(2) > label > div > input').type('Restaurace ' + makeid(8))
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset.EventsPage_when__m6NZ3 > div > label:nth-child(1) > div > input[type=date]').click()
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset.EventsPage_when__m6NZ3 > div > label:nth-child(2) > div > input[type=time]').type('07:00')
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset.EventsPage_when__m6NZ3 > div > label:nth-child(3) > div > input[type=time]').type('08:30')
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset.EventsPage_when__m6NZ3 > div:nth-child(3) > label > div > input[type=number]').type(10)
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalBody__nShFl > form > fieldset:nth-child(4) > select').select('test0test0')
        cy.get('#root > div > div > div.EventsPage_modalBackground__W2To7 > div > div.EventsPage_modalFooter__28T9d > button.button-primary').click()
        cy.contains('Restaurace')
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