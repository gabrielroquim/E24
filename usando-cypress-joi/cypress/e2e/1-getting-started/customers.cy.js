/// <reference types="cypress" />
var faker = require('faker-br')
import contrato from '../../contracts/customers.contract'


describe('Teste de Customers API', () => {
    let token
    before(() => {
        cy.token('roquim', 'admin').then(tkn => { token = tkn })
    });

    it('Deve Validar o contrato de customers', () => {
        cy.request('api/customers').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar Customers', () => {
        cy.request({
            method: 'GET',
            url: 'api/customers',
            headers: { accessToken: token }
        }).then((response) => {
            expect(response.body.firstName[0]).to.equal('Amanda')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('id')
        })
    });


    it('Cadastrar Custormers', () => {

        var nome = `${faker.name.firstName()}`
        var email = `${faker.internet.email()}`
        var sobreNome = `${faker.name.lastName()}`
        var telefone = `${faker.phone.phoneNumber()}`
        cy.request({
            method: 'POST',
            url: '/api/customers',
            headers: { accessToken: token },
            body: {
                "address": {
                    "id": "clad17m3e0308ygpij1bbr6mg"
                },
                "email": email,
                "firstName": nome,
                "lastName": sobreNome,
                "phone": telefone
            }

        }).then((response) => {
            expect(response.status).to.equal(201)
        })
    })
});

