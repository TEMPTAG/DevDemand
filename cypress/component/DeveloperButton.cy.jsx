// @ts-nocheck
import React from 'react';
import { mount } from 'cypress/react18';
import DeveloperButton from '../../client/src/components/DashboardComponents/DeveloperButton';
import '@testing-library/cypress/add-commands';

describe('Developer Button Component', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '/graphql'
    },
    {
      fixture: 'mockSeed.json',
      statusCode: 200
    }).as('mockDevelopers');
  });

  it('should render a developer button', () => {
    const developer = {
      _id: "00000000001",
      imageUrl: "https://avatar.iran.liara.run/public",
      firstName: "John",
      lastName: "Doe",
      bio: "Hello! I'm JD, a full-stack developer. I work hard.",
      onClick: cy.stub(),
      isActive: false
    };

    mount(<DeveloperButton {...developer} />);
    
    // Debugging: Log the component's HTML
    cy.get('button').then(($button) => {
      console.log($button.html());
    });

    cy.get('button').should('exist');
    cy.get('img[src*="avatar.iran.liara.run"]').should('exist');
    cy.contains("John Doe").should('exist');
    cy.contains("Hello! I'm JD, a full-stack developer. I work hard.").should('exist');
  });
});