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

app.get('/api/diapers', (req, res) => {
  diapers.getAll().then(diapers => {
    res.json({diapers: diapers});
  });
});

app.post('/api/diapers', (req, res) => {
  console.log(req.body);
  diapers.create(req.body)
  .then(diaper => {
    res.json({ diapers: diaper });
  })
});

app.delete('/api/diapers', (req, res) => {
  console.log(req.body);
  // diapers.remove(req.body)
  //   .then(diaper => {
  //     res.json({ diapers: diaper });
  //   })
  res.json({diapers: "yo delete"})
});

app.use(notFound)
app.use(errorHandler)

// eslint-disable-next-line
function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important (automatic) browser requests
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({ error: 'Url not found', status: 404, url })
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}
app.listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port))
