describe('Login', () => {

    it('Deve realizar login com sucesso', () => {

        cy.visit('/')

        cy.get('[data-test="username"]')
            .type('standard_user')

        cy.get('[data-test="password"]')
            .type('secret_sauce')

        cy.get('[data-test="login-button"]')
            .click()

        cy.url()
            .should('include', '/inventory.html')

        cy.task('log', '=== LOGIN REALIZADO COM SUCESSO ===')

    })


    it('Deve tentar login com usuário inválido', () => {

        cy.visit('/')

        cy.get('[data-test="username"]')
            .type('standard')

        cy.get('[data-test="password"]')
            .type('secret_sauce')

        cy.get('[data-test="login-button"]')
            .click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface')

        cy.task('log', '=== NÃO FOI POSSÍVEL FAZER LOGIN ===')

    })

    it('Deve tentar login com senha inválida', () => {

        cy.visit('/')

        cy.get('[data-test="username"]')
            .type('standard_user')

        cy.get('[data-test="password"]')
            .type('secret')

        cy.get('[data-test="login-button"]')
            .click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface')

    
        cy.task('log', '=== NÃO FOI POSSÍVEL FAZER LOGIN ===')


    })

    it('Deve exibir erro ao tentar login com usuário bloqueado', () => {

    cy.visit('/')

    cy.get('[data-test="username"]')
        .type('locked_out_user')

    cy.get('[data-test="password"]')
        .type('secret_sauce')

    cy.get('[data-test="login-button"]')
        .click()

    cy.get('[data-test="error"]')
        .should('contain', 'Sorry, this user has been locked out.')

    cy.task('log', '=== USUÁRIO BLOQUEADO VALIDADO COM SUCESSO ===')

})


})