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

Cypress.Commands.add('token', (email, senha) => { 
    cy.request({
        method: 'POST',
        url: '/api/login',      
        body: {
            "username": email,
            "password": senha
        }
    }).then((response) => {       
        return response.body.accessToken
    })
})


Cypress.Commands.add('cadastrarCustomers', (token, email, nome, sobreNome, telefone) => { 
    cy.request({
        method: 'POST',
        url: 'login',  
        headers: {accessToken: token},
        body: {

            "address": {
                "id": "clabpczmb0086ugpiipzj02e8"
            },
            "email": email,
            "firstName": nome,
            "lastName": sobreNome,
            "phone": telefone
        }           
    }).then((response) => {       
        return response.body.accessToken
    })
})