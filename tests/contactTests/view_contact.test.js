const { sequelize, Sequelize, Contact } = require('../../models');
const { getContacts } = require('../../src/controllers/contactControllers');

beforeEach(async () => {
  await Contact.destroy({ truncate: true });
});

beforeAll(async () => {
  await sequelize.authenticate(); // Conectarse a la base de datos
});

afterAll(async () => {
  await sequelize.close(); // Cerrar la conexión a la base de datos
});


describe('getContacts', () => {
  it('should retrieve all contacts from the database', async () => {
    // Aquí puedes agregar código adicional si es necesario antes de ejecutar la función getContacts

    const req = {}; // Simula el objeto de solicitud
    const res = { // Simula el objeto de respuesta
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn(); // Simula la función next

    await getContacts(req, res, next); // Ejecuta la función getContacts

    // Verifica si la respuesta JSON es la esperada
    expect(res.json).toHaveBeenCalledWith({
      message: 'Your contact book is empty',
    });
    expect(res.status).not.toHaveBeenCalled(); // Verifica que res.status no se haya llamado (es decir, no se produjo un error)

    // Aquí puedes agregar más aserciones según tus requisitos
  });
});
