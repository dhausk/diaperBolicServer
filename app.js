const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const diapers = require('./db/diapers');
app.use(cors())

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  diapers.getAll().then(diapers => {
    res.json({ data: "congrats you've hit the api diapers" });
  });
});

app.get('/api/', (req, res) => {
  diapers.getAll().then(diapers => {
    res.json({diapers: diapers});
  });
});

app.post('/api/', (req, res) => {
  console.log(req.body);
  diapers.create(req.body)
  .then(diaper => {
    res.json({ diapers: diaper });
  })
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});