const req = require('supertest');
const { getAccessToken } = require('../utils/request');
const API_URL = process.env.API_URL
var faker = require('faker-br');

describe('Clientes', () => {
    let token
    const nomes = ['Lucas', 'Luigi', 'Mario bagio']

    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    })

    it('(RegisterCustomers) Cadastrar Clientes', async () => {
        let email = `${faker.internet.email()}`
        let firstName = `${faker.name.firstName()}`
        let lastname = `${faker.name.lastName()}`
        let phone = `${faker.phone.phoneNumber()}`
     
        await req(API_URL)
            .post('/customers')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "address": {
                  "id": "cl9xciy570133bwpikkxw5vyv"
               },

                "email": email,
                "firstName": firstName,
                "lastName": lastname,
                "phone": phone
            })
           
            .then(response => {
                expect(response.statusCode).toEqual(201)
            })

    });

    it('(CustomersCheck)listar Clientes', async () => {
        await req(API_URL)
            .get('/customers')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.id).not.toBe(toString)
                expect(response.body).toBeInstanceOf(Array)            
                expect(['Lucas', 'Luigi', 'Mario bagio']).toEqual(expect.arrayContaining(nomes))
              

            })
    });



});