const { getContactbyName } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');

const contactName = 'Ismael';
describe('getContactByName', () => {
  it('should get a contact by Name', async () => {
    const req = {
      body: {
        name: contactName
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await getContactbyName(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Search result:',
      data: expect.any(Array)
    });
    expect(next).not.toHaveBeenCalled();
  });
});
