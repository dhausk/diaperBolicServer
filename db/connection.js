const monk = require('monk');
const connectionString = process.env.MONGODB_URI || process.env.MONGOLAB_URI || "localhost:27017/diapers";
const db = monk(connectionString);
db.then();
module.exports = dbl