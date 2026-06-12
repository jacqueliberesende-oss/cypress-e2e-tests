describe('Compras', () => {

    beforeEach(() => {

        cy.login()
    })


    it('Deve ordenar os produtos por preço do Menor para o Maior', () => {

        cy.get('[data-test="product-sort-container"]')
            .select('lohi')

        const prices = []

        cy.get('.inventory_item_price')
            .each(($price) => {

                const value = Number(
                    $price.text().replace('$', '')
                )

                prices.push(value)

            })
            .then(() => {

                const sortedPrices = [...prices].sort((a, b) => a - b)

                expect(prices).to.deep.equal(sortedPrices)

            })

        cy.task('log', '=== ORDENAÇÃO DO MENOR PARA O MAIOR VALIDADA COM SUCESSO ===')

    })

    it('Deve adicionar produtos ao carrinho', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
            .scrollIntoView()
            .click()

        cy.get('.shopping_cart_badge')
            .should('contain', '3')

        cy.task('log', '=== PRODUTOS ADICIONADOS COM SUCESSO ===')

    })

    it('Deve retirar um produto do carrinho', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
            .scrollIntoView()
            .click()

        cy.get('.shopping_cart_badge')
            .should('contain', '3')

        cy.get('[data-test="remove-sauce-labs-bike-light"]')
            .click()

        cy.get('.shopping_cart_badge')
            .should('have.text', '2')

        cy.task('log', '=== RETIRADO UM ITEM DO CARRINHO ===')

    })

    it('Deve acessar o carrinho e validar os produtos adicionados', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
            .click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '3')

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.url()
            .should('include', '/cart.html')

        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        cy.contains('Sauce Labs Bike Light')
            .should('be.visible')

        cy.contains('Test.allTheThings() T-Shirt (Red)')
            .should('be.visible')

        cy.get('.cart_item')
            .should('have.length', 3)

        cy.task('log', '=== PRODUTOS VALIDADOS NO CARRINHO COM SUCESSO ===')

    })

    it('Deve continuar comprando e adicionar um terceiro produto ao carrinho', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.url()
            .should('include', '/cart.html')

        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        cy.contains('Sauce Labs Bike Light')
            .should('be.visible')

        cy.get('.cart_item')
            .should('have.length', 2)

        cy.get('[data-test="continue-shopping"]')
            .click()

        cy.url()
            .should('include', '/inventory.html')

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
            .click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '3')

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        cy.contains('Sauce Labs Bike Light')
            .should('be.visible')

        cy.contains('Test.allTheThings() T-Shirt (Red)')
            .should('be.visible')

        cy.get('.cart_item')
            .should('have.length', 3)

        cy.task('log', '=== TERCEIRO PRODUTO ADICIONADO E VALIDADO COM SUCESSO ===')

    })

    it('Deve iniciar o processo de finalização da compra', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.get('[data-test="checkout"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-one.html')

        cy.task('log', '=== FINALIZAÇÃO DA COMPRA INICIADO COM SUCESSO ===')

    })

    it('Deve preencher os dados obrigatórios para finalizar compra', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.get('[data-test="checkout"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-one.html')

        cy.get('[data-test="firstName"]')
            .type('Teste')

        cy.get('[data-test="lastName"]')
            .type('Group')

        cy.get('[data-test="postalCode"]')
            .type('30110000')

        cy.get('[data-test="continue"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-two.html')

        cy.contains('Checkout: Overview')
            .should('be.visible')

        cy.task('log', '=== DADOS OBRIGATÓRIOS PREENCHIDOS COM SUCESSO ===')

    })

    it('Deve finalizar a compra com sucesso', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.get('[data-test="checkout"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-one.html')

        cy.get('[data-test="firstName"]')
            .type('Teste')

        cy.get('[data-test="lastName"]')
            .type('Group')

        cy.get('[data-test="postalCode"]')
            .type('30110000')

        cy.get('[data-test="continue"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-two.html')

        cy.contains('Checkout: Overview')
            .should('be.visible')

        cy.get('[data-test="finish"]')
            .click()

        cy.url()
            .should('include', '/checkout-complete.html')

        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!')

        cy.task('log', '=== COMPRA FINALIZADA COM SUCESSO ===')

    })

    it('Deve realizar o fluxo completo de compra com sucesso', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')

        cy.get('[data-test="shopping-cart-link"]')
            .click()

        cy.url()
            .should('include', '/cart.html')

        cy.contains('Sauce Labs Backpack')
            .should('be.visible')

        cy.contains('Sauce Labs Bike Light')
            .should('be.visible')

        cy.get('.cart_item')
            .should('have.length', 2)

        cy.get('[data-test="checkout"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-one.html')

        cy.get('[data-test="firstName"]')
            .type('Teste')

        cy.get('[data-test="lastName"]')
            .type('Group')

        cy.get('[data-test="postalCode"]')
            .type('30110000')

        cy.get('[data-test="continue"]')
            .click()

        cy.url()
            .should('include', '/checkout-step-two.html')

        cy.contains('Checkout: Overview')
            .should('be.visible')

        cy.get('[data-test="finish"]')
            .click()

        cy.url()
            .should('include', '/checkout-complete.html')

        cy.get('[data-test="complete-header"]')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!')

        cy.task('log', '=== FLUXO COMPLETO DE COMPRA EXECUTADO COM SUCESSO ===')

    })




})