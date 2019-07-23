#!/usr/local/bin/node -r esm

import express from 'express';
import bodyParser from 'body-parser';

import generateData from './generateData';

const app = express();
const port = 8191;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  return res.send(
    JSON.stringify({
      message: 'The server is running. You better catch it!',
    }),
  );
});

app.post('/fetch_data', (req, res) => {
  const { reactorIds } = req.body;
  if (!reactorIds) {
    return res.send({
      error: 'No reactor_id specified',
    });
  }
  console.log('Triggering thaumic fission for ' + reactorIds.length + ' reactors');
  const reactorData = generateData(reactorIds);
  return res.send(JSON.stringify(reactorData));
});

app.listen(port, () => console.log(`Thaumic fission engine initialising...`));
