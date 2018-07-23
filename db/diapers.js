const db = require('./connection');
const Joi = require('joi');
const diapers = db.get('diapers');
const schema = Joi.object().keys({
    userName: Joi.string(),
    babyName: Joi.string(),
    type: Joi.number(),
    timeStamp: Joi.string()
  });

function getAll(){
  return diapers.find({});
};
function getUsersData(user) {
  return diapers.find({userName: user});
};
function create(diaper) {
  const result = Joi.validate(diaper, schema);
  if (result.error == null) {
    if(!diaper.timeStamp) diaper.timeStamp = new Date();
    return diapers.insert(diaper);
  }
  else {
    return Promise.reject(result.error);
  };
};
function remove(id) {
  diapers.findOneAndDelete({ _id: id});
}
function upDate(id, body) {
  const result = Joi.validate(body, schema);
  if (result.error == null) {
    if (!diaper.timeStamp) diaper.timeStamp = new Date();
    return diapers.findOneAndUpdate({ _id: id }, body);
  }
  else {
    return Promise.reject(result.error);
  };
}
module.exports = { getAll, getUsersData, create, remove, upDate }