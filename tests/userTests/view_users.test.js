const { sequelize, Sequelize, User } = require('../../models');
const { getUsers } = require('../../src/controllers/userControllers');

beforeEach(async () => {
  await User.destroy({ truncate: true });
});

beforeAll(async () => {
  await sequelize.authenticate(); // Conectarse a la base de datos
});

afterAll(async () => {
  await sequelize.close(); // Cerrar la conexión a la base de datos
});


describe('getUsers', () => {
  it('should retrieve all users from the database', async () => {
    // Aquí puedes agregar código adicional si es necesario antes de ejecutar la función getContacts

    const req = {}; // Simula el objeto de solicitud
    const res = { // Simula el objeto de respuesta
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn(); // Simula la función next

    await getUsers(req, res, next); // Ejecuta la función getUsers

    // Verifica si la respuesta JSON es la esperada
    expect(res.json).toHaveBeenCalledWith({
      message: 'All your users',
      data: expect.any(Array),
    });
    expect(res.status).not.toHaveBeenCalled(); // Verifica que res.status no se haya llamado (es decir, no se produjo un error)

    // Aquí puedes agregar más aserciones según tus requisitos
  });
});