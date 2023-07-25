describe('Blog App', function() {

  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    
    const user = {
      name: 'Junaid Ansari',
      username: 'junaid',
      password: 'hehe'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')

  })

  it('Login form is shown', function() {

    cy.contains('Login to the Application')

  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {

      cy.get('#username').type('junaid')
      cy.get('#password').type('hehe')
      cy.get('#login-button').click()

      cy.contains('Junaid Ansari logged in')

    })

    it('fails with wrong credentials', function() {

      cy.get('#username').type('junaid')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.red')
        .should('contain', 'Wrong Credentials')

      cy.should('not.contain', 'Junaid Ansari logged in')

    })

  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({
        username: 'junaid',
        password: 'hehe'
      })
    })

    it('A blog can be created', function() {

      cy.contains('New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Junaid Ansari')
      cy.get('#url').type('http://localhost:3002')
      cy.get('#likes').type('67')
      cy.get('#add-blog').click()

      cy.contains('a blog created by cypress')

    })

    describe('And a blog exists', function() {

      beforeEach(function() {

        cy.createBlog({
          title: 'another blog by cypress',
          author: 'Junaid Ansari',
          url: 'http://localhost:3002',
          likes: 7
        })

      })

      it('It can be liked', function() {

        cy.contains('another blog by cypress')
          .parent()
          .contains('View')
          .click()
          
        cy.get('.togglableContent')
          .contains('Like')
          .click()

        cy.get('.togglableContent')
          .contains('8 likes')

      })      

    })

  })

})