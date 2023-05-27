const { sequelize, Contact } = require('../../models');
const { addContact } = require('../../src/controllers/contactControllers');

beforeEach(async () => {
  await Contact.destroy({ truncate: true });
});

describe('addContact', () => {
  it('should create a new contact', async () => {
    const req = {
      body: {
        name: 'Encontrame',
        lastname: 'Toy',
        phone: '00000',
        favourite: false,
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
        favourite: false,
      }),
    });
    expect(next).not.toHaveBeenCalled();
     // Verificar que el contacto se haya guardado en la base de datos
     const createdContact = await Contact.findOne({
      where: { phone: '00000' },
    });
   
    expect(createdContact).toBeTruthy();
    expect(createdContact.name).toBe('Encontrame');
    expect(createdContact.lastname).toBe('Toy');
    expect(createdContact.favourite).toBe(false);
  });

  // Otros casos de prueba aquí...
});
