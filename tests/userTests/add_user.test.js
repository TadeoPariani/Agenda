const { sequelize, User } = require('../../models');
const { addUser } = require('../../src/controllers/userControllers');

//Limpiar la base de datos antes de ejecutar el testeo
// beforeEach(async () => {
//   await User.destroy({ truncate: true });
// });

describe('addUser', () => {
  it('should create a new User', async () => {
    const req = {
      body: {
        name: 'juan',
        email: 'juan@gmail.com',
        password: 'juan123'
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await addUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'New user has been created successfully',
      data: expect.objectContaining({
        name: 'juan',
        email: 'juan@gmail.com',
        password: req.body.password
      }),
    });

    expect(next).not.toHaveBeenCalled();
     // Verificar que el usuario se haya guardado en la base de datos
     const createdUser = await User.findOne({
      where: { email: 'juan@gmail.com' },
    });
   
    expect(createdUser).toBeTruthy();
    expect(createdUser.name).toBe('juan');
    expect(createdUser.gmail).toBe('juan@gmail.com');
    //
  });

  // Otros casos de prueba aquí...
});