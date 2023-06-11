const { sequelize, User } = require('../../models');
const { getUser } = require('../../src/controllers/userControllers');
const { verificationId } = require('../../src/auth/auth');

const id = 4;

describe('getUser', () => {
  it('should retrieve one user from the database', async () => {
    const req = {
      params: {
        id: id
      }
    }; // Simula el objeto de solicitud

    const res = { // Simula el objeto de respuesta
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    await verificationId(req, res, next);
    await getUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'User: ',
      data: expect.any(Object)
    });

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
