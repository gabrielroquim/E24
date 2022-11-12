const req = require('supertest');
//const assert = require('assert')
let getAccessToken = (user, pass) => {
    return req('http://localhost:3001/api')
        .post('/login')
        .send({
            "username": user,
            "password": pass
        })
        .set('Accept', 'application/json')
        .then(response => {
            return response.body.accessToken
        })
}

module.exports = { getAccessToken }
