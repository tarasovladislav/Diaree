const title = "My Event Title"
const titleEdited = "My New Event Changed Title"
const description = "Description ".repeat(3)
const descriptionEdited = "Description ".repeat(7)

import Chance from 'chance'
const chance = new Chance()
const newEmail = chance.email();
const password = "1234";

before(() => {
    cy.clearLocalStorage()
    cy.visit('/');
    cy.url().should('include', '/authenticate');
    cy.contains('register').click();
    cy.get('#registerUser').type(newEmail);
    cy.get('#registerPass').type(password);
    cy.get('#registerPassConfirm').type(password).type('{enter}');
    cy.url().should('include', '/home');
});


describe('Add/Remove Entry Test', () => {
    it('It should create entry', () => {
        cy.visit('/')
        cy.url().should('include', '/home')
        cy.contains('22').click();
        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag1, Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains(title).should('exist');
    })
    it('It should remove created entry', () => {
        cy.get('.DayComponent')
            .within(() => {
                cy.contains(title).click();
            });
        cy.contains(title);
        cy.contains(description);
        cy.get('.controlContainer')
            .find('.controlButton')
            .eq(0)
            .click();
        cy.get('.close-button').click()
        cy.contains(title).should('not.exist');
    })
})



describe('Add/Modify/Delete Entry Test', () => {

    it('It should create entry', () => {
        cy.contains('22').click();
        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag1, Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains(title).should('exist');
    })

    it('It should edit entry', () => {
        cy.get('.DayComponent')
            .within(() => {
                cy.contains(title).click();
            });
        cy.contains(title);
        cy.get('.controlContainer')
            .find('.controlButton')
            .eq(1)
            .click();
        cy.contains('Editing Entry')
    })

    it('It should edit Title', () => {
        cy.get('input[name="title"]').clear().type(titleEdited);
        cy.get('input[name="title"]').should('have.value', titleEdited);
    })

    it('It should edit Description', () => {
        cy.get('textarea[name="description"]').clear().type(descriptionEdited);
        cy.get('textarea[name="description"]').should('have.value', descriptionEdited);
    })

    it('It should remove Tags', () => {
        cy.get('.tags .TagBox-Item').should('have.length', 3);
        cy.get('.Information-Item .tags').find('.TagBox-Item').eq(1).click()
        cy.get('.tags .TagBox-Item').should('have.length', 2);
        cy.get('#saveChanges').click()
    })

    it('It should remove created entry', () => {
        cy.get('.DayComponent').first().click();
        cy.contains(titleEdited);
        cy.contains(descriptionEdited);
        cy.get('.controlContainer')
            .find('.controlButton')
            .eq(0)
            .click();
        cy.contains(titleEdited).should('not.exist');
        cy.get('.close-button').click()
        cy.contains(titleEdited).should('not.exist');
    })
})


describe('Add more than one daily event', () => {
    it('It should create entry', () => {
        cy.contains('22').click();
        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag1, Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains(title).should('exist');
    })

    it('It should create one more entry', () => {
        cy.get('.DayComponent')
            .within(() => {
                cy.contains(title).click();
            });
        cy.contains('Add New Event').click();
        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag1, Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains(title).should('exist');
    })

    it('Should be 2 entrances after adding', () => {
        cy.get('.DayComponent').should('have.length', 2);
    })
    it('Removing entries', () => {

        cy.get('.dayEventList').find('.DayComponent')
            .eq(0).click();
        cy.get('.dayEventList')
            .find('.DayComponent ')
            .eq(0).contains(title).click({ force: true });
        cy.get('.controlButton').first().click();
        cy.get('.controlButton').first().click();
        cy.get('.close-button').click()


    })



})


describe('Search Test', () => {
    it('It should create entry', () => {
        cy.contains('22').click();
        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag1, Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains(title).should('exist');
    })

    it('It should create one more entry', () => {
        cy.contains('21').click();
        cy.get('input[name="title"]').type("testingSearch");
        cy.get('textarea[name="description"]').type(description);
        cy.get('input[name="tags"]').type('Tag2, Tag3,');
        cy.get('#addEntry').click();
        cy.contains("testingSearch").should('exist');

    })
    
    it('It should find entry in search', () => {
        cy.get('.Searchbar > input').type("test")
        cy.get('.Searchbar-Result-Item > p').should('have.length', 1)
    })
})

describe('Tag Highlighting', () => {
    it('After clicking on tag, it should change class', () => {
        cy.get('.TagBox > :nth-child(3)').click()
        cy.get('.TagBox > :nth-child(3)').should('have.class', 'TagBox-Item-Selected');
    })
    
    it('Entries with tag should change class', () => {
        cy.get('.dayEventList > .DayComponent').should('have.class', 'tagIncluded');
    })
})




after(() => {
    cy.clearLocalStorage()

    // cy.visit('/');
    // cy.get('.End').find('img').eq(1).click();
    // cy.contains('Log out').click()
});     