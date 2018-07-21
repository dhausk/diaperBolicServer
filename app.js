const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const babies = require('./db/Babies');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  babies.getAll().then(baby => {
    res.json(baby);
  });
});
app.post('/', (req, res) => {
  console.log(req.body);
  babies.create(req.body).then(baby => {
    res.json(baby);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});