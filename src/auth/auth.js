const bcrypt = require('bcrypt');
const Joi = require('joi')

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

export const userSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(3).required()
        .messages({
            'string.pattern.base': 'The name cannot contain numbers or special characters'
        }),
  email: Joi.string().min(3).email().required()
        .messages({
            'string.pattern.base': 'The phone number can only be made up of numbers'
        }),
  password: Joi.string().min(3).max(30).required()
  .messages({
      'string.pattern.base': ''
  })
});










