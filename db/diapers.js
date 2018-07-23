const db = require('./connection');

const Joi = require('joi');

const schema = Joi.object().keys({
    userName: Joi.string(),
    babyName: Joi.string(),
    type: Joi.number()
  });
  
const diapers = db.get('diapers');

function getAll() {
  return diapers.find();
}

function create(diaper) {
  const result = Joi.validate(diaper, schema);
  if (result.error == null) {
    diaper.created = new Date();
    return diapers.insert(diaper);
  }
  else {
    return Promise.reject(result.error);
  };
};
function remove(id) {
  diapers.findOneAndDelete({ _id: id})
}



module.exports = { getAll, create, remove }