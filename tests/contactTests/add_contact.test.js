const { sequelize, Contact } = require('../../models');
const { addContact } = require('../../src/controllers/contactControllers');

//Limpiar la base de datos antes de ejecutar el testeo
 beforeEach(async () => {
  await Contact.destroy({ truncate: true });
});

beforeAll(async () => {
  await sequelize.authenticate(); // Conectarse a la base de datos
});

afterAll(async () => {
  await sequelize.close(); // Cerrar la conexión a la base de datos
});

describe('addContact', () => {
  it('should create a new contact', async () => {
    const req = {
      body: {
        name: 'Encontrame',
        lastname: 'Toy',
        phone: '00000',
        favourite: true,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await addContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'New contact has been created successfully',
      data: expect.objectContaining({
        name: 'Encontrame',
        lastname: 'Toy',
        phone: '00000',
        favourite: true,
      }),
    });
    expect(next).not.toHaveBeenCalled();
     const createdContact = await Contact.findOne({
      where: { phone: '00000' },
    });
   
    expect(createdContact).toBeTruthy();
    expect(createdContact.name).toBe('Encontrame');
    expect(createdContact.lastname).toBe('Toy');
    expect(createdContact.favourite).toBe(true);
  });

});