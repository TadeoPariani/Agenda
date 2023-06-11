const { sequelize, Sequelize, User } = require('../../models');
const { getUsers } = require('../../src/controllers/userControllers');

describe('getUsers', () => {
  it('should retrieve all users from the database', async () => {
    const req = {}; // Simula el objeto de solicitud
    const res = { // Simula el objeto de respuesta
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    const next = jest.fn(); // Simula la función next

    await getUsers(req, res, next); // Ejecuta la función getUsers

    // Verifica si la respuesta JSON es la esperada
    expect(res.json).toHaveBeenCalledWith({
      message: 'All your users',
      data: expect.any(Array)
    });
    expect(res.status).toHaveBeenCalled();
  });
});
