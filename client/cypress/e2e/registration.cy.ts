import Chance from 'chance'
const chance = new Chance()
const newEmail = chance.email();
const password = "1234";



describe('Add/Remove Entry Test', () => {
    it('It should register user', () => {
        cy.visit('/');
        cy.url().should('include', '/authenticate');
        cy.get('.Login-Form > .Credentials > .Submit > a').click()
        cy.get('#registerUser').type(newEmail);
        cy.get('#registerPass').type(password);
        cy.get('#registerPassConfirm').type(password).type('{enter}');
        cy.url().should('include', '/home');
    })


    it('It should logout', () => {
        cy.visit('/');
        cy.get('.End').find('img').eq(1).click();
        cy.contains('Log out').click()
    })


})