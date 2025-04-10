// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('preencheCamposFormularioEEnvia', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('de Tal');
    cy.get('#email').type('fulanoDeTal@teste.com');
    cy.get('#phone').type('11999999999');
    cy.get('#open-text-area').type('Mensagem de teste');

    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('preencheCamposFormularioEEnvia1', (nome, sobrenome, email, telefone, mensagem) => {
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    cy.get('#phone').type(telefone);
    cy.get('#open-text-area').type(mensagem);

    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('preencheCamposFormularioEEnvia2', valores => {
    cy.get('#firstName').type(valores.nome);
    cy.get('#lastName').type(valores.sobrenome);
    cy.get('#email').type(valores.email);
    cy.get('#phone').type(valores.telefone);
    cy.get('#open-text-area').type(valores.mensagem);

    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('preencheCamposFormularioEEnvia3', (valores = {
    nome: 'FulanoDefault',
      sobrenome: 'de Tal Default',
      email: 'emailDefault@teste.com',
      telefone: '22999999999',
      mensagem: 'Mensagem de teste Default'
}) => {
    cy.get('#firstName').type(valores.nome);
    cy.get('#lastName').type(valores.sobrenome);
    cy.get('#email').type(valores.email);
    cy.get('#phone').type(valores.telefone);
    cy.get('#open-text-area').type(valores.mensagem);

    cy.get('button[type="submit"]').click();
});