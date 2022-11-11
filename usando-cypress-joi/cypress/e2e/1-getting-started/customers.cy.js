/// <reference types="cypress" />
var faker = require('faker-br')
///const { getAccessToken } = require('../../../utils/request')




describe('Teste de Cliente API', () => {
 let token
    before(async () => {
        cy.token('roquim', 'admin').then(tkn => { token = tkn })
    });

    it('Cadastrar Custormers', () => {
         cy.cadastrarCustomers(token) 

        }).then((response) => {
            expect(response.status).to.equal(201)
        })

    });


    it(' Deve Listar Clientes', () => {
        cy.request({
            method: 'GET',
            url: 'customers',

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.data).to.have.property('email')

        })
    })


