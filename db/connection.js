const monk = require('monk');
const connectionString = "localhost/babies";
const db = monk(connectionString);

module.exports = db;