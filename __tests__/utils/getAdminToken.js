const supertest = require('supertest')
const app = require('../../server');
const request = supertest(app);

const getAdminToken = async () => {
    let admin = {
        name: "Some",
        surname: "Name",
        email: "admin@email.com",
        password: "adminpass",
        role: "admin"
    };

    let res = await request.post('/api/auth/signin').send({
        email: "admin@email.com",
        password: "adminpass"
    })

    if (res.status == 200){
        return res.body.token
    } else {
        await request.post('/api/auth/signup').send(admin)
        
        res = await request.post('/api/auth/signin').send({
            email: "admin@email.com",
            password: "adminpass"
        })
        
        return res.body.token
    }    

}

module.exports = getAdminToken