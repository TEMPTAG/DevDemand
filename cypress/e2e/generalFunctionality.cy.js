/// <reference types="cypress" />
// test that first div is visible and says "The Right Talent, Right Now - Browse Our Developer Database and Take Your Project from Dream to Deployed!"
describe('General Functionality Tests', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('displays first div with correct text', () => {
      cy.get('.text-center.text-white.bg-primary.py-1').should('have.text', 'The Right Talent, Right Now - Browse Our Developer Database and Take Your Project from Dream to Deployed!')
    })
  
    it('displays header with logo and login button', () => {
      // Check if the logo exists and is wrapped in a link
      cy.get('a.navbar-brand').should('have.attr', 'href', '/')
      cy.get('a.navbar-brand img').should('have.attr', 'src', '/assets/logos/DDHeaderLogo.svg')
    })
  
    it('displays second div with correct text', () => {
      cy.get('.card-title.h5').should('have.text', 'Browse our Developers:')
    })
  
    it('displays clickable button that renders a modal with profile-card to the right component', () => {
      cy.get('.card-body').first().click()
      cy.get('.profile-card.mx-auto.border.shadow.p-3.mb-4.card').should('exist')
      // cy.get('.profile-card').should('exist')
    })
  })
  