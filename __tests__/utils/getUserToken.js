const supertest = require('supertest')
const app = require('../../server');
const request = supertest(app);

const getUserToken = async () => {
    let user = {
        name: "Some",
        surname: "Name",
        email: "user@email.com",
        password: "userpass",
        role: "user"
    };

    let res = await request.post('/api/auth/signin').send({
        email: "user@email.com",
        password: "userpass"
    })

    if (res.status == 200){
        return res.body.token
    } else {
        await request.post('/api/auth/signup').send(user)
        
        res = await request.post('/api/auth/signin').send({
            email: "user@email.com",
            password: "userpass"
        })
        
        return res.body.token
    }    

}

module.exports = getUserToken