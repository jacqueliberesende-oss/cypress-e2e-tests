## Testes E2E (Cypress)

Este projeto contém testes automatizados E2E utilizando Cypress.

### Estrutura atual

Os testes estão organizados da seguinte forma:

- `login.cy.js` → Testes de autenticação de usuário
- `compras.cy.js` → Testes de funcionalidades de compras e ordenação de produtos

### Escopo dos testes

- Validação de login com credenciais válidas
- Validação de autenticação e sessão do usuário
- Validação da listagem de produtos
- Validação da ordenação de produtos por preço
- Garantia de fluxo básico de compra

### Observações

- Utilização de seletores `data-test` sempre que possível
- Foco em estabilidade e validação de fluxos críticos do usuário