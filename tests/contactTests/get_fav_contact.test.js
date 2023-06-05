const { sequelize, Sequelize, Contact } = require('../../models');
const { getFavouritesContacts } = require('../../src/controllers/contactControllers');

beforeAll(async () => {
  await sequelize.authenticate(); // Conectarse a la base de datos
});

afterAll(async () => {
  await sequelize.close(); // Cerrar la conexión a la base de datos
});

describe('getFavouritesContacts', () => {
  it('should retrieve all favourites contacts from the database', async () => {
    const contacts = await Contact.findAll({ where: { favourite: true } });
    console.log(contacts);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await getFavouritesContacts(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Here are your favourite Contacts',
      data: expect.any(Array),
    });
    expect(res.status).not.toHaveBeenCalled();
  });
});
