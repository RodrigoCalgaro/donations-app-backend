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


describe("GET /api/collects", () => {
    let collect;

    it("Should return the collect with status 200", async () => {
        const res = await request.get("/api/collects").send()

        collect = res.body;
        expect(res.statusCode).toEqual(200);

        expect(collect).toHaveProperty("collectId");
        expect(collect).toHaveProperty("startsDate");
        expect(collect).toHaveProperty("endsDate");
        expect(collect).toHaveProperty("targetAmount");
        expect(collect).toHaveProperty("totalDonors");
        expect(collect).toHaveProperty("totalRaised");
        expect(collect).toHaveProperty("stillNeeded");
        expect(collect).toHaveProperty("percentageRaised");
        expect(collect).toHaveProperty("remainingDays");
    });
})

describe("UPDATE /api/collects", () => {
    let collect = {
        startsDate: "2021-12-09",
        endsDate: "2021-12-20",
        targetAmount: 10000,
        minDonationAllowed: 10,
        suggestedDonation: 50
      } ;

    it("Should return the updated collect with status 200 when user is an admin", async () => {
        const res = await request.put("/api/collects").set("Authorization", `Bearer ${adminToken}`).send()

        collect = res.body;
        expect(res.statusCode).toEqual(200);

        expect(collect).toHaveProperty("collectId");
        expect(collect).toHaveProperty("startsDate");
        expect(collect).toHaveProperty("endsDate");
        expect(collect).toHaveProperty("targetAmount");
        expect(collect).toHaveProperty("minDonationAllowed");
        expect(collect).toHaveProperty("suggestedDonation");
    });

    it("Should return status 401 when user is logged but isn't an admin", async () => {
        const res = await request.put("/api/collects").set("Authorization", `Bearer ${userToken}`).send()

        expect(res.statusCode).toEqual(401);
    });

    it("Should return status 401 when user isn't logged", async () => {
        const res = await request.put("/api/collects").send()

        expect(res.statusCode).toEqual(401);
    });
})