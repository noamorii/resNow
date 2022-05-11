describe('create unregistred reservation', () => {

    it('create unregistred reservation', () => {
        cy.visit('https://reservenow.herokuapp.com/login')
        cy.get('form:nth-child(2)').type('Tester1')
        cy.get('form label:nth-child(3)').type('Tester1')
        cy.get('button').click()
        cy.wait(500)
        cy.visit('https://reservenow.herokuapp.com/app/rezervace')
        cy.get('#root > div > div > div > div.ReservationPage_tableContainer__5piee > table > thead > tr > td:nth-child(9) > button').click()
        cy.get('#root > div > div > div > div.ModalCreateReservation_modalWindow__D2bIs > div > form > button > p').click()
        // TODO k oprave
    })
})