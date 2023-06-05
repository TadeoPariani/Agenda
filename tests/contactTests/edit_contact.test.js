const { editContact } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});

const contactId = 5;
describe('editContact', () => {
  it('Edit contact by ID', async () => {
    const req = {
      params: { id: contactId },
      body: {
        name: 'John',
        lastname: 'Doe',
        phone: '1234567'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await editContact(req, res, next);

    

    expect(next).not.toHaveBeenCalled();
     
     const editedContact = await Contact.findOne({
      where: { id: contactId },
    });

    expect(editedContact.name).toBe('John');

    // sexpect(editedContact.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'The contact has been updated successfully',
      data: expect.any(Object)
    });
  });
});
