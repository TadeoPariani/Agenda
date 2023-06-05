const { editContact } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});

const contactId = 106
describe('editContact', () => {
  it('Edit contact by ID', async () => {
    const req = {
      params: { id: contactId },
      body: {
        name: 'John',
        lastname: 'Doe',
        phone: '123456789',
        favourite: true
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const contact = {
      update: jest.fn().mockResolvedValue(true), // Configura la respuesta de update
      save: jest.fn().mockResolvedValue(true) // Configura la respuesta de save
    };

    Contact.findByPk = jest.fn().mockResolvedValue(contact);

    await editContact(req, res);

    expect(Contact.findByPk).toHaveBeenCalledWith(contactId);
    expect(contact.update).toHaveBeenCalledWith({
      name: 'John',
      lastname: 'Doe',
      phone: '123456789',
      favourite: true
    });
    expect(contact.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'The contact has been updated successfully',
      data: contact
    });
  });
});
