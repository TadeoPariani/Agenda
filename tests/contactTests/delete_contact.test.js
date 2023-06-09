const { deleteContact } = require('../../src/controllers/contactControllers');
const { sequelize, Sequelize, Contact } = require('../../models');


const contactId= 117;
describe('deleteContact', () => {
  it('should delete a contact by ID', async () => {
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

    await deleteContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Contact has been deleted successfully',
    });
    expect(next).not.toHaveBeenCalled();
  });

 
});
