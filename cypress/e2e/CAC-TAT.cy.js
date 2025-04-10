describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklsmnopqrstuv123456789', 10); //repete a string pela quantidade de vezes informada

    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('de Tal');
    cy.get('#email').type('fulanodetal@teste.com');
    cy.get('#phone').type('11999999999');
    // cy.get('#open-text-area').type('Mensagem de teste');
    cy.get('#open-text-area').type(longText, { delay: 0 }); // delay padrao é 10, quando 0 ele digita o texto todo de uma vez 
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('de Tal');
    cy.get('#email').type('fulanodetal@teste,com');
    cy.get('#phone').type('11999999999');
    cy.get('#open-text-area').type('Mensagem de teste');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it('campo telefone continua vazio quando preenchido com um valor não-númerico', () => {
    cy.get('#phone')
      .type('abcdefghijk')
      .as('phone');
    cy.get('@phone').should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Fulano');
    cy.get('#lastName').type('de Tal');
    cy.get('#email').type('fulanodetal@teste.com');
    cy.get('#open-text-area').type('Mensagem de teste');
    cy.get('#phone-checkbox').check();
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Fulano').as('firstName');
    cy.get('@firstName').should('have.value', 'Fulano');
    cy.get('@firstName').clear();
    cy.get('@firstName').should('have.value', '');

    cy.get('#lastName').type('de Tal').as('lastName');
    cy.get('@lastName').should('have.value', 'de Tal');
    cy.get('@lastName').clear();
    cy.get('@lastName').should('have.value', '');

    cy.get('#email').type('fulanodetal@teste.com').as('email');
    cy.get('@email').should('have.value', 'fulanodetal@teste.com');
    cy.get('@email').clear();
    cy.get('@email').should('have.value', '');

    cy.get('#phone').type('11999999999').as('fone');
    cy.get('@fone').should('have.value', '11999999999');
    cy.get('@fone').clear();
    cy.get('@fone').should('have.value', '');

    cy.get('#open-text-area').type('Mensagem de teste');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado, valores fixos no comands', () => {
    cy.preencheCamposFormularioEEnvia();

    cy.get('.success').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado , recebe parametros', () => {
    cy.preencheCamposFormularioEEnvia1('Fulano', 'de Tal', 'email@teste.com', '11999999999', 'Mensagem de teste');

    cy.get('.success').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado, recebe como parametro um objeto', () => {
    const valores = {
      nome: 'Fulano',
      sobrenome: 'de Tal',
      email: 'email@teste.com',
      telefone: '11999999999',
      mensagem: 'Mensagem de teste'
    }

    cy.preencheCamposFormularioEEnvia2(valores);

    cy.get('.success').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado, com valor padrao', () => {
    cy.preencheCamposFormularioEEnvia3();

    cy.get('.success').should('be.visible');
  });

  it('procurando o botao pelo texto e clicando', () => {
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
      cy.wrap($radio).check().should('be.checked');
    });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json').should((input) => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', { actions: 'drag-drop'}).should((input) => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile');

    cy.get('input[type="file"]').selectFile('@sampleFile').should((input) => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  it('verifica que a política de privacidade abre em outra aba sem precisar de um clique', () => {
    cy.get('#privacy a').contains('Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').contains('Política de Privacidade').invoke('removeAttr', 'target').click();

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade');
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
  }); 
})