const { getContactbyLastName } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');

const contactLastName = 'Meridio';
describe('getContactByLastame', () => {
  it('should get a contact by Lastname', async () => {
    const req = {
      body: {
        lastname: contactLastName
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await getContactbyLastName(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Search result:',
      data: expect.any(Object)
    });
    expect(next).not.toHaveBeenCalled();
  });
});
