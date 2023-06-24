const { sequelize, Contact } = require('../../models');
const { addContact } = require('../../src/controllers/contactControllers');

// Limpiar la base de datos antes de ejecutar el testeo
//  beforeEach(async () => {
//   await Contact.destroy({ truncate: true });
// });

const name = 'Ece';
const lastname = 'olivero';
const phone = '234873345';
const favourite = true;
describe('addContact', () => {
  it('should create a new contact', async () => {
    const req = {
      body: {
        name: name,
        lastname: lastname,
        phone: phone,
        favourite: favourite
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const next = jest.fn();

    await addContact(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'New contact has been created successfully',
      data: expect.objectContaining({
        name: name,
        lastname: lastname,
        phone: phone,
        favourite: favourite
      })
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(next).not.toHaveBeenCalled();
    const createdContact = await Contact.findOne({
      where: { phone: phone }
    });

    expect(createdContact).toBeTruthy();
    expect(createdContact.name).toBe(name);
    expect(createdContact.lastname).toBe(lastname);
    expect(createdContact.favourite).toBe(favourite);
  });
});
