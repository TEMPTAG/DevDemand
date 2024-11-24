import React from 'react'
import DeveloperButton from '../../../client/src/components/DashboardComponents/DeveloperButton'

describe('<DeveloperButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DeveloperButton />)
  })
})