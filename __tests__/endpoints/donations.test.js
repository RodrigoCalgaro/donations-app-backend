const supertest = require("supertest")
const app = require("../../server");
const request = supertest(app);
const getUserToken = require("../utils/getUserToken");
const getAdminToken = require("../utils/getAdminToken");

let userToken;
let adminToken;

beforeAll(async () => {
    userToken = await getUserToken();
    adminToken = await getAdminToken();
});


describe("POST /api/donations", () => {
    let donation = {
        amount: 10
    };

    it("Should return a 201 when user is logged", async () => {
        const res = await request.post("/api/donations").set("Authorization", `Bearer ${userToken}`).send(donation)

        expect(res.statusCode).toEqual(201);
    });

    it("Should return a 401 when user isn't logged", async () => {
        const res = await request.post("/api/donations").send(donation)

        expect(res.statusCode).toEqual(401);
    });
})

describe("GET /api/donations", () => {

    it("Should a 200 when user is admin", async () => {
        const res = await request.get("/api/donations/?pageNumber=1&pageSize=5&sorterBy=amount&sorterDirection=desc").set("Authorization", `Bearer ${adminToken}`).send()

        expect(res.statusCode).toEqual(200);

        expect(Array.isArray(res.body)).toBe(true);
    })

    it("Should return status 401 when user is logged but isn't an admin", async () => {
        const res = await request.get("/api/donations/?pageNumber=1&pageSize=5&sorterBy=amount&sorterDirection=desc").set("Authorization", `Bearer ${userToken}`).send()


        expect(res.statusCode).toEqual(401);
    });

    it("Should return status 401 when user isn't logged", async () => {
        const res = await request.get("/api/donations/?pageNumber=1&pageSize=5&sorterBy=amount&sorterDirection=desc").send()

        expect(res.statusCode).toEqual(401);
    });
})

describe("GET /api/donations/{id}", () => {

    it("Should a 200 when user is admin", async () => {
        const res = await request.get("/api/donations/1").set("Authorization", `Bearer ${adminToken}`).send()

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty("donationId");
        expect(res.body).toHaveProperty("date");
        expect(res.body).toHaveProperty("amount");
        expect(res.body).toHaveProperty("collectId");
        expect(res.body).toHaveProperty("userId");
    })

    it("Should return status 401 when user is logged but isn't an admin", async () => {
        const res = await request.get("/api/donations/1").set("Authorization", `Bearer ${userToken}`).send()


        expect(res.statusCode).toEqual(401);
    });

    it("Should return status 401 when user isn't logged", async () => {
        const res = await request.get("/api/donations/1").send()

        expect(res.statusCode).toEqual(401);
    });
})

describe("PUT /api/donations/{id}", () => {
    let donation = {
        donationId: 1,
        date: "2021-12-10T13:16:35.000Z",
        amount: 10,
        collectId: 1,
        userId: 1
    }

    it("Should a 200 when user is admin", async () => {
        const res = await request.put("/api/donations/1").set("Authorization", `Bearer ${adminToken}`).send(donation)

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty("donationId");
        expect(res.body).toHaveProperty("date");
        expect(res.body).toHaveProperty("amount");
        expect(res.body).toHaveProperty("collectId");
        expect(res.body).toHaveProperty("userId");
    })

    it("Should return status 401 when user is logged but isn't an admin", async () => {
        const res = await request.put("/api/donations/1").set("Authorization", `Bearer ${userToken}`).send(donation)


        expect(res.statusCode).toEqual(401);
    });

    it("Should return status 401 when user isn't logged", async () => {
        const res = await request.put("/api/donations/1").send(donation)

        expect(res.statusCode).toEqual(401);
    });
})


describe("DELETE /api/donations/{id}", () => {

    it("Should a 200 when user is admin", async () => {
        const res = await request.delete("/api/donations/1").set("Authorization", `Bearer ${adminToken}`).send()

        expect(res.statusCode).toEqual(200);
    })

    it("Should return status 401 when user is logged but isn't an admin", async () => {
        const res = await request.delete("/api/donations/1").set("Authorization", `Bearer ${userToken}`).send()


        expect(res.statusCode).toEqual(401);
    });

    it("Should return status 401 when user isn't logged", async () => {
        const res = await request.delete("/api/donations/1").send()

        expect(res.statusCode).toEqual(401);
    });
})