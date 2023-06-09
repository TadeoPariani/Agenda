const { sequelize, User } = require('../../models');
const { addUser } = require('../../src/controllers/userControllers');
const bcrypt = require('bcrypt');
const nombre = "Harraaaaaaaay"
const email = "adaaaad@gmail.com"
const contras = "eldajaaaayta"



describe('addUser', () => {
  it('New user has been created successfully', async () => {
    const req = {
      body: {
        name: nombre,
        email: email,
        password: contras
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
        name: nombre, 
        email: email,
        password: expect.anything()
      }),
    });

    expect(next).not.toHaveBeenCalled();
     // Verificar que el usuario se haya guardado en la base de datos
     const createdUser = await User.findOne({
      where: { email: email },
    });

    const hashedPassword = await bcrypt.compare(contras, createdUser.password);

    expect(createdUser).toBeTruthy();
    expect(createdUser.name).toBe(nombre);
    expect(createdUser.email).toBe(email);
    expect(hashedPassword).toBe(true)
  });
});