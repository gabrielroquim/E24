/// <reference types="cypress" />

describe('Teste de Cliente API', () => {

    it.only(' Deve Listar Clientes', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/customers',
            body: {
                "username": "gabriel",
                "password": "admin"
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.data).to.have.property('email')
           
        })
    });

});
