const { sequelize, User } = require('../../models');
const { deleteUser } = require('../../src/controllers/userControllers');
const { verificationId } = require ('../../src/auth/auth.js')

const id = 8

describe('Delete User', () => {
  it('should delete one user from the database', async () => {
    const req = {
      params: {
          id:id
      }
    }; // Simula el objeto de solicitud

    const res = { // Simula el objeto de respuesta
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const next = jest.fn(); 

    await verificationId(req, res, next)
    await deleteUser(req, res, next); 

    expect(res.json).toHaveBeenCalledWith({
      message: 'User deleted',
      data: expect.any(Array),
    });

    expect(res.status).toHaveBeenCalledWith(200);
  });
});