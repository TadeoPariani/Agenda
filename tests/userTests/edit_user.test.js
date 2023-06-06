const { sequelize, User } = require('../../models');
const { editUser } = require('../../src/controllers/userControllers');
const { verificationId } = require ('../../src/auth/auth.js')
const bcrypt = require('bcrypt');

// datos de prueba
const id = 38
const nombre = "maria"
const email = "maria@gmail.com"
const contras = "maria123"

//Limpiar la base de datos antes de ejecutar el testeo
// beforeEach(async () => {
//   await User.destroy({ truncate: true });
// });

describe('editUser', () => {
  it('User has been edited successfully', async () => {
    const req = {
      params: {
        id:id
      },
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

    await verificationId(req, res, next)
    await editUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'The user has been edited successfully',
      data: expect.objectContaining({
        name: nombre, 
        email: email,
        password: expect.anything()
      })
      // user: expect.objectContaining({
      //   id:id,
      //   name:"alejandro",
      //   email:"alejandro@gmail.com",
      //   password: expect.anything(),
      //   createdAt: expect.anything(),
      //   updatedAt: expect.anything()
      // })
    });

    expect(next).toHaveBeenCalled();
     // Verificar que el usuario se haya editado en la base de datos
     const editedUser = await User.findOne({
      where: { email: email },
    });

    const hashedPassword = await bcrypt.compare(contras, editedUser.password);

    expect(editedUser).toBeTruthy();
    expect(editedUser.name).toBe(nombre);
    expect(editedUser.email).toBe(email);
    expect(hashedPassword).toBe(true)
  });
});