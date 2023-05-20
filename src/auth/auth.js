const bcrypt = require('bcrypt');

export async function hashPass(body, res) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(body, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    return null;
  }
}











