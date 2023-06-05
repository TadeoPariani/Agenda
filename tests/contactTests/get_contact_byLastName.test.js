const { getContactbyLastName } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');
beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});

describe('getContactByName', () => {
  it('should get a contact by Name', async () => {
    const contactLastName= 'Toy';
    const req = { 
      body: { 
        lastname: contactLastName
      } 
    };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };
    const next = jest.fn();

    await getContactbyLastName(req, res, next);

    //expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message:"Search result:",
        data:expect.any(Object)
    });
    expect(next).not.toHaveBeenCalled();
  });

 
});