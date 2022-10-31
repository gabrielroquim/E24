const req = require('supertest');

let getAccessToken = (user, pass) => {
    return req('http://localhost:3000/api')
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
