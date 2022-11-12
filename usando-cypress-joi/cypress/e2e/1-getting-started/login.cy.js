/// <reference types="cypress" />

describe('Login', () => {

  
    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'api/login',
            body: {
                "username": "roquim",
                "password": "admin"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)          
            cy.log(response.body.accessToken)
        })
    });

});
