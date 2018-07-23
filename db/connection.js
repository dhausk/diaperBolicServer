const monk = require('monk');
const connectionString = process.env.MONGODB_URI || "localhost:27017/diapers";
const db = monk(connectionString);
db.then(()=> console.log('DB connected to server'));
module.exports = db;