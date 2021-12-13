const supertest = require("supertest")
const app = require("../../server");
const request = supertest(app);

describe("POST /auth/signup", () => {
    let user = {
        name: "Some New",
        surname: "Name",
        email: "newUser@email.com",
        password: "newUserpass",
        role: "user"
    };

    it("Should return a 201 when user is new", async () => {
        const res = await request.post("/api/auth/signup").send(user)

        expect(res.statusCode).toEqual(201);

        expect(res.body).toHaveProperty("message");
    });

    it("Should return a 401 when user already exists", async () => {
        const res = await request.post("/api/auth/signup").send(user)

        expect(res.statusCode).toEqual(401);

        expect(res.body).toHaveProperty("message");
    });
})


describe("POST /auth/signin", () => {
    let user = {
        email: "newUser@email.com",
        password: "newUserpass"
    };

    it("Should return a 200 when user exists", async () => {
        const res = await request.post("/api/auth/signin").send(user)

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("userId");
        expect(res.body.user).toHaveProperty("email");
        expect(res.body.user).toHaveProperty("role");
    });

    it("Should return a 401 when email is wrong", async () => {
        user = {
            email: "newUserWrong@email.com",
            password: "newUserpass"
        };

        const res = await request.post("/api/auth/signin").send(user)

        expect(res.statusCode).toEqual(401);

        expect(res.body).toHaveProperty("message");
    });

    it("Should return a 401 when password is wrong", async () => {
        user = {
            email: "newUser@email.com",
            password: "newUserpassWrong"
        };

        const res = await request.post("/api/auth/signin").send(user)

        expect(res.statusCode).toEqual(401);

        expect(res.body).toHaveProperty("message");
    });
})