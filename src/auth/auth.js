const bcrypt = require('bcrypt');


// export const hashPass = async function(password){
//   const saltRounds = 10;

//   let dd = await bcrypt.hash(password, saltRounds)

//   return dd

  
// }




export async function hashPass(body, res) {
  const saltRounds = 10;
    bcrypt.hash(body, saltRounds, async function(err, hash) {
        if (err) {
            return "mal"
        } else {
            return hash
        }
    });
}



// export const hashPass = async function(password) {
//   try {
//     const hash = await bcrypt.hash(password, saltRounds, function(err, hash){
//     });
//     return hash
//   } catch (err) {
//     throw err;
//   }
// };











