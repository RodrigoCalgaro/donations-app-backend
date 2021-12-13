
const collectService = require("../../services/collectService");

describe('Collect Service', () => {
  let collectFound;

  it('create', async () => {
    let collect = {
      collectId: 1,
      startsDate: '2021-12-13',
      endsDate: '2021-12-13',
      targetAmount: 10000,
      minDonationAllowed: null,
      suggestedDonation: null
    }

    let collectCreated = await collectService.create(collect);

    expect(collectCreated.collectId).toBe(1);
    expect(collectCreated.startsDate).toBe('2021-12-13');
    expect(collectCreated.endsDate).toBe('2021-12-13');
    expect(collectCreated.targetAmount).toBe(10000);
    expect(collectCreated.minDonationAllowed).toBe(null);
    expect(collectCreated.suggestedDonation).toBe(null);
  })

  it('findByPk', async () => {
    collectFound = await collectService.findByPk(1);

    expect(collectFound.collectId).toBe(1);
    expect(collectFound.startsDate).toBe('2021-12-13');
    expect(collectFound.endsDate).toBe('2021-12-13');
    expect(collectFound.targetAmount).toBe(10000);
    expect(collectFound.minDonationAllowed).toBe(null);
    expect(collectFound.suggestedDonation).toBe(null);
  })


  it('update', async () => {
    let newData = {
      collectId: 1,
      startsDate: '2021-12-14',
      endsDate: '2021-12-14',
      targetAmount: 5000,
      minDonationAllowed: 10,
      suggestedDonation: 50
    }

    let collectUpdated = await collectService.update(collectFound, newData);

    expect(collectUpdated.collectId).toBe(1);
    expect(collectUpdated.startsDate).toBe('2021-12-14');
    expect(collectUpdated.endsDate).toBe('2021-12-14');
    expect(collectUpdated.targetAmount).toBe(5000);
    expect(collectUpdated.minDonationAllowed).toBe(10);
    expect(collectUpdated.suggestedDonation).toBe(50);
  })
})