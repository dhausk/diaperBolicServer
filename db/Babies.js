const db = require('./connection');
const babies = db.get('babies');
const Joi = require('joi');

const schema = joi.object().keys({
  user: Joi.string().min(2).required,
  babyName: Joi.string().required,
});


function getAll() {
  return babies.find();
}
function create(baby) {

  const result = Joi.validate(baby, schema);
  if (result.error === null) {
    return babies.insert(baby);
  }
  else {
    return Promise.reject(result.error);
  };
};
module.exports = { getAll, create }