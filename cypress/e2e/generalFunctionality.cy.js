/// <reference types="cypress" />
// test that first div is visible and says "The Right Talent, Right Now - Browse Our Developer Database and Take Your Project from Dream to Deployed!"
describe('General Functionality Tests', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('displays first div with correct text', () => {
      cy.get('.text-center.text-white.bg-primary.py-1').should('have.text', 'The Right Talent, Right Now - Browse Our Developer Database and Take Your Project from Dream to Deployed!')
    })
    
    // Test Header is visible and contains logo button and login button
    it('displays header with logo and login button', () => {
      cy.get('.navbar').should('contain.text', 'Logo').and('contain.text', 'Login')
    })
  
    // test that second div is visible and says "Browse Our Developer Database"
    it('displays second div with correct text', () => {
      cy.get('.card-title.h5').should('have.text', 'Browse our Developers:')
    })
  
  
    it('displays clickable button that renders a modal with profile-card component', () => {
      cy.get('.card-body').click()
      cy.get('.modal').should('exist')
      cy.get('.profile-card').should('exist')
    })
  })
// Test class card-body clickable button that renders a modal with profile-card component