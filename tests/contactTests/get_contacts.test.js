const { sequelize, Sequelize, Contact } = require('../../models');
const { getContacts } = require('../../src/controllers/contactControllers');




describe('getContacts', () => {
  //Se espera que se ejecute cuando si haya datos en la tabla Contacts -> db_test
  it('should retrieve all contacts from the database', async () => {
    const contacts = await Contact.findAll();
    

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    await getContacts(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Here are all your available Contacts',
      data: expect.any(Array),
    });
    console.log(contacts)
    expect(res.status).toHaveBeenCalled();
  });

  
});


