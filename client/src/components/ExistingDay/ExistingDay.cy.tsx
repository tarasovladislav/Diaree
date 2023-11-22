import React from 'react'
import ExistingDay from './ExistingDay'

describe('<ExistingDay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ExistingDay />)
  })
})