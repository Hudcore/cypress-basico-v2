/// <reference types="cypress" />



describe('Central de Atendimento ao Cliente TAT', function () { //describe representa a suíte de teste
    beforeEach(function () {  // a cada execução, recarrega a página 
        cy.visit('./src/index.html')

    })

    it('Verifica o título da Aplicação', function () {  //it representa o caso de teste a ser executado
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('Preenche os campos obrigatórios e envia o FORM', function () {
        cy.get('#firstName').type('Hudson', { delay: 0 })  // o parametro {delay: 0} aplica um tempo diferente do default para execução do teste
        cy.get('#lastName').type('Voigt', { delay: 0 })
        cy.get('#email').type('teste@email.com', { delay: 0 })
        cy.get('#phone').type('4899999999', { delay: 0 })
        cy.get('#open-text-area').type('Validando campos obrigatórios', { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')  //valida que a mensagem de envio foi mostrada

    })



    it('Mensagem de erro - Email inválido', function () {

        //verifica se formatação errada do e-mail e apresenta erro

        cy.get('#firstName').type('Nome', { delay: 0 })
        cy.get('#lastName').type('Sobrenome', { delay: 0 })
        cy.get('#email').type('teste@email', { delay: 0 })
        cy.get('#phone').type('4899999999', { delay: 0 })
        cy.get('#open-text-area').type('Validando erro de e-mail incorreto', { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })


    it('Validando - Telefone aceita apenas números', function () {

        //verifica se formatação errada do telefone apresenta erro

        cy.get('#phone').type('abcdefghijk', { delay: 0 })
        cy.get('#phone').should('have.value', '')


    })


    it('Validando - Telefone não enviado antes do envio', function () {

        //verifica se o telefone foi clicado e valida o envio

        cy.get('#firstName').type('Talita', { delay: 0 })
        cy.get('#phone-checkbox').check()
        cy.get('#lastName').type('Sobrenome', { delay: 0 })
        cy.get('#email').type('teste@email.com', { delay: 0 })
        cy.get('#open-text-area').type('Validando o se o telefone foi preenchido antes do envio, deve acusar erro!', { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })



    it('Preenche e apaga os campos', function () {
        cy.get('#firstName').type('Hudson', { delay: 0 })
        cy.get('#firstName').should('have.value', 'Hudson')
        cy.get('#firstName').clear().should('have.value', '')

        cy.get('#lastName').type('Voigt', { delay: 0 })
        cy.get('#lastName').should('have.value', 'Voigt')
        cy.get('#lastName').clear().should('have.value', '')

        cy.get('#email').type('teste@email.com', { delay: 0 })
        cy.get('#email').should('have.value', 'teste@email.com', { delay: 0 })
        cy.get('#email').clear().should('have.value', '')

        cy.get('#phone').type('4899999999', { delay: 0 })
        cy.get('#phone').should('have.value', '4899999999', { delay: 0 })
        cy.get('#phone').clear().should('have.value', '')

        cy.get('#open-text-area').type('Validando campos obrigatórios', { delay: 0 })
        cy.get('#open-text-area').should('have.value', 'Validando campos obrigatórios')
        cy.get('#open-text-area').clear().should('have.value', '')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })



    it('Mensagem de erro ao dar submit sem dados', function () {

        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()  //utilizando Contains para enviar os dados ao invés de passar o seletor
        cy.get('.error').should('be.visible')  //valida que a mensagem de erro foi exibida

    })

    it('Envia FORM via comando customizado', function () {
        cy.enviaDadosObrigatorios()
        cy.get('.success').should('be.visible')  //valida que a mensagem de envio foi mostrada


    })

    it('Seleciona youtube na caixa de seleção pelo texto e valida o value', function () {
        cy.get('select').select('YouTube')   //aqui seleciona pelo texto exibido
        cy.get('select').should('have.value', 'youtube') //confere se o value da opção está correto
    }

    )

    it('Seleciona mentoria na caixa de texto pelo value', function () {

        cy.get('select').select('mentoria')
        cy.get('select').should('have.value', 'mentoria') //confere se o value da opção está correto

    })

    it('Seleciona o texto Blog pelo indice do select', function() {

        cy.get('select').select(1).should('have.value', 'blog') //selecionao indice 0 como primeiro da lista
       // cy.get('select').should('have.value', 'blog') //conferindo se está correto
    })


    it('Verificar se o campo feedback foi marcado', function(){

        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })


    it('Verifica se todos os campos foram marcados', function(){


        cy.get('input[type="radio"')
        .should('have.length',3)  //verifica se tem 3 elemetos do tipo radio
        .each(function($radio){

         cy.wrap($radio).check()      //checa todos
         cy.wrap($radio).should('be.checked')  //verifica se foram checados   
        })   

    })


  it('Marca ambos os checkbox, mas desmarca o último',function(){

    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')


  })    

/*  -- comentado para passar no CI

  it('Upload de arquivo da pasta fixtures', function(){

    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('C:/Users/hudco/cypress-basico-v2/cypress/fixtures/example.json')
    .should(function($input) {             //faz uma função de callback que verifica após coleta do arquivo se o nome esta ok
        expect($input[0].files[0].name).to.equal('example.json')
    })



  })


    it('Seleciona arquivo simulando Drag and Drop', function(){

        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')                          /// elemento action para simular o drag n drop vvvvvv
        .selectFile('C:/Users/hudco/cypress-basico-v2/cypress/fixtures/example.json',{action: "drag-drop"}) 
        .should(function($input) {             //faz uma função de callback que verifica após coleta do arquivo se o nome esta ok
            expect($input[0].files[0].name).to.equal('example.json')
        })


    })


    it('Selecionar arquivo selecionando a fixture para qual foi dada um alias',function(){

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) { expect($input[0].files[0].name).to.equal('example.json')})
        
    })
    */

it('Verifica que a página abre, sem precisar clicar',function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank') //pega o elemento A na DIV privacy e verifica que abre em outra aba


})


it('Acessa a página da politica de privacidade, remove o target pra abrir na mesma aba',function(){
    cy.get('#privacy a').invoke('removeAttr','target').click() //remove o target pra abrir na mesma aba e clica

    cy.contains('Talking About Test').should('be.visible')  //verifica se o texto existe na pagina carregada
})




})