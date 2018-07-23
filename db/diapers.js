const db = require('./connection');

// const Joi = require('joi');

// const schema = Joi.object().keys({
  //   userName: Joi.string().min(2).required,
  //   babyName: Joi.string().required,
  //   type: Joi.string()
  // });
  
const diapers = db.get('diapers');

function getAll() {
  return diapers.find();
}

function create(diaper) {
  // const result = Joi.validate(diaper, schema);
  // if (result.error == null) {
    console.log(diaper);
    diaper.created = new Date();
    return diapers.insert(diaper);
  // }
  // else {
  //   return Promise.reject(result.error);
  // };
};
module.exports = { getAll, create }