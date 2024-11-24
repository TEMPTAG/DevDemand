import React from 'react';
import { mount } from 'cypress/react18';
import DeveloperButton from '../../client/src/components/DashboardComponents/DeveloperButton';
import mockDevelopers from '../fixtures/mockSeed.json';
import '@testing-library/cypress/add-commands';

describe('Developer Button Component', () => {
    beforeEach(() => {
        // cy.intercept('POST', 'http://localhost:3000/graphql', (req) =>
      cy.intercept({
          method: 'POST',
          url: '/graphql'
        },
        {
          fixture: 'mockSeed.json',
          statusCode: 200
        }
        ).as('mockDevelopers');
      });
  
    it('should render a developer button', () => {
      mount(<DeveloperButton />);
      cy.get('button').should('exist');
    //   cy.get('button').contains('').click();
    });
  
    // it('should answer questions and complete the quiz', () => {
    //   cy.mount(<Quiz />);
    //   cy.get('button').contains('Start Quiz').click();
  
    //   // Answer questions
    //   cy.get('button').contains('1').click();
  
    //   // Verify the quiz completion
    //   cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    // });
  
    // it('should restart the quiz after completion', () => {
    //   cy.mount(<Quiz />);
    //   cy.get('button').contains('Start Quiz').click();
  
    //   // Answer questions
    //   cy.get('button').contains('1').click();
  
    //   // Restart the quiz
    //   cy.get('button').contains('Take New Quiz').click();
  
    //   // Verify the quiz is restarted
    //   cy.get('.card').should('be.visible');
    //   cy.get('h2').should('not.be.empty');
    // });
  });
  