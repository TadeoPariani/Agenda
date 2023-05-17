const bcrypt = require('bcrypt');
const saltRounds = 10;

export const contra = bcrypt.hash(password, saltRounds, async function(err, hash) {
  return hash
})

export function hashPassword(password){

 

  return "eee"

}

export function sum(a) {
  return a + 1;
}

// module.exports = {hashPassword};




