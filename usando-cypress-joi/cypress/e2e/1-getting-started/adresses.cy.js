/// <reference types="cypress" />
var faker = require('faker-br')
import contrato from '../../contracts/adresses.contract'


describe('Teste de Customers API', () => {
    let token
    before(() => {
        cy.token('roquim', 'admin').then(tkn => { token = tkn })
    });

    it('Deve Validar o contrato de adresses', () => {
        cy.request('api/adresses').then(response => {
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar Adresses', () => {
        cy.request({
            method: 'GET',
            url: 'api/adresses',
            headers: { accessToken: token }
        }).then((response) => {
            expect(response.body.adress_1[0]).to.equal('Rua João dois')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('city')
        })
    });


    it('Cadastrar Adresses', () => {
        var rua = `${faker.address.streetName()}`
        var bairro = `${faker.address.streetAddres()}`
        var cidade = `${faker.address.city()}`
        var estado = `${faker.address.state()}`
        cy.request({
            method: 'POST',
            url: '/api/adresses',
            headers: { accessToken: token },
            body: {
                "address": {
                    "id": "clad17m3e0308ygpij1bbr6mg"
                },
                "adress_1": rua,
                "adress_2": bairro,
                "city": cidade,
                "state": estado,
                "zip": 0001010
            }

        }).then((response) => {
            expect(response.status).to.equal(201)
        })
    })
});

