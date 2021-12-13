
const donationService = require("../../services/donationService");

describe('Donation Service', () => {
    let donationFound;

    it('create', async () => {
        let amount = 50;
        let date = '2021-12-13';
        let collectId = 1;
        let userId = 1;

        let donation = {
            date,
            amount,
            collectId,
            userId
        }

        let donationCreated = await donationService.create(donation);

        expect(donationCreated.donationId).toBe(1);
        expect(donationCreated.date).toStrictEqual(new Date('2021-12-13'));
        expect(donationCreated.amount).toBe(50);
        expect(donationCreated.collectId).toBe(1);
        expect(donationCreated.userId).toBe(1);
    })

    it('findByPk', async () => {
        donationFound = await donationService.findByPk(1);

        expect(donationFound.donationId).toBe(1);
        expect(donationFound.date).toStrictEqual(new Date('2021-12-13'));
        expect(donationFound.amount).toBe(50);
        expect(donationFound.collectId).toBe(1);
        expect(donationFound.userId).toBe(1);
    })


    it('update', async () => {
        let amount = 60;
        let date = '2021-12-14';
        let collectId = 1;
        let userId = 1;

        let newData = {
             date,
            amount,
            collectId,
            userId
        }

        let donationUpdated = await donationService.update(donationFound, newData);

        expect(donationUpdated.donationId).toBe(1);
        expect(donationUpdated.date).toStrictEqual(new Date('2021-12-14'));
        expect(donationUpdated.amount).toBe(60);
        expect(donationUpdated.collectId).toBe(1);
        expect(donationUpdated.userId).toBe(1)
    })

    it('count', async () => {
        let count = await donationService.count(1);

        expect(count).toBe(1);
    })

    it('getTotalDonors', async () => {
        let getTotalDonors = await donationService.getTotalDonors(1);

        expect(getTotalDonors).toBe(1);
    })

    it('getTotalRaised', async () => {
        let getTotalRaised = await donationService.getTotalRaised(1);

        expect(getTotalRaised).toBe(60);
    })

    it('getAll', async () => {
        let donations = await donationService.getAll(1, "", "donationId", "DESC", 1, 0);

        expect(Array.isArray(donations)).toBe(true);
    })

    it('destroyByPk', async () => {
        let destroyByPk = await donationService.destroyByPk(1);

        expect(destroyByPk).toBe(1);
    })
})