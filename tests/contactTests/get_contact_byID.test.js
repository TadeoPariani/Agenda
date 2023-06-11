const { getContactbyID } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');


const contactId= 111;
describe('getContactById', () => {
  it('should get a contact by ID', async () => {
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

    expect(res.json).toHaveBeenCalledWith({
        message:"Here is your Contact",
        data:expect.any(Object)
    });
    expect(next).not.toHaveBeenCalled();
  });

 
});
