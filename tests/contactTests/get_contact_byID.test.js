const { getContactbyID } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');
// beforeAll(async () => {
//   await sequelize.authenticate();
// });

// afterAll(async () => {
//   await sequelize.close();
// });

describe('getContactById', () => {
  it('should get a contact by ID', async () => {
    const contactId= 4;
    const req = { 
      params: { 
        id: contactId
      } 
    };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };
    const next = jest.fn();

    await getContactbyID(req, res, next);

    //expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message:"Here is your Contact",
        data:expect.any(Object)
    });
    expect(next).not.toHaveBeenCalled();
  });

 
});
