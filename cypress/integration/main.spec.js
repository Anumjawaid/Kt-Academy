/// <reference types="cypress" />

describe('test_name', function() {
  beforeEach(() => {
    cy.viewport(1792, 1041)
    cy.visit('https://learningdriven.space/')
    cy.setCookie('userUuid', 'fakeUUID')
  })

  it('main_page_data', function() {
    cy.contains('WE TEACH PROGRAMMING')
        .should('be.visible')

    cy.contains('What training do you need?')
        .scrollIntoView()
        .should('be.visible')

    cy.contains('Kotlin')
        .should('be.visible')

    cy.contains('Workshops dedicated to Kotlin ecosystem, including Coroutines and Android.')
        .should('be.visible')

    cy.contains('Check the most popular workshops')
        .should('be.visible')

    // cy.contains('Open workshops')
    //     .scrollIntoView()
    //     .should('be.visible')

    cy.contains('Why training with us?')
        .scrollIntoView()
        .should('be.visible')

    cy.contains('Our workshops are conducted by world-class experts, focus on best practices and made as practical as possible.')
        .should('be.visible')

    cy.contains('Learn by doing')
        .should('be.visible')

    cy.contains('Trusted by')
        .scrollIntoView()
        .should('be.visible')

    cy.get(".trustedby-logo")
        .should('be.visible')

    cy.contains('Book a practical workshop tailored to your needs')
        .scrollIntoView()
        .should('be.visible')
        .click()
  })

})
