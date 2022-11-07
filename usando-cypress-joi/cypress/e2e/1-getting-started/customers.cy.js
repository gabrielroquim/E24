/// <reference types="cypress" />
var faker = require('faker-br')
//const { getAccessToken } = require('../../../utils/request')



describe('Teste de Cliente API', () => {

    let token
    before(async () => {
        cy.token('admin', 'admin').then(tkn => { token = tkn })
    });

    it('Cadastrar Clientes', () => {
        cy.request({
            method: 'POST',
            url: '/customers',
            body: {

                "address": {
                    "id": "cl9xciy570133bwpikkxw5vyv"
                },
                "email": "amanda@cypress.com",
                "firstName": "Amanda",
                "lastName": "Cypress",
                "phone": "01198530447"
            },

        }).then((response) => {
            expect(response.status).to.equal(201)
        })

    });


    it.only(' Deve Listar Clientes', () => {
        cy.request({
            method: 'GET',
            url: '/customers',

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.data).to.have.property('email')

        })
    })

})
