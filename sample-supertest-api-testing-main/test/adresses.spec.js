const req = require('supertest');
const { getAccessToken } = require('../utils/request');
const API_URL = process.env.API_URL
var faker = require('faker-br')


describe('Adresses', () => {
    let token


    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    })

    it('(AdressesRegister) Cadastrar Endereços', async () => {
        let address1 = `${faker.address.streetAddress()}`
        let address2 = `${faker.address.secondaryAddress()}`
        let city = `${faker.address.city()}`
        let state = `${faker.address.state()}`
        // let zip = `${faker.address.zipCode()}` 

        await req(API_URL)
            .post('/addresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            .send({
                "address_1": address1,
                "address_2": address2,
                "city": city,
                "state": state,
                "zip": 0,
            })

    });
    it('(AdressesCheck) Listar Endereços', async () => {
        await req(API_URL)
            .get('/addresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .set('Acept', 'aplication/json')
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.id).not.toBe(toString)
                expect(response.body).toBeInstanceOf(Array)
            })
    });
});