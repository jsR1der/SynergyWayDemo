const express = require('express');
const { folderName, fileName } = require('./utils');
const { join } = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/data', (req, res) => {
  const json = fs.readFileSync(folderName + '/' + fileName, 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
});

app.listen(3001, () => {
  console.log(`server on port 3001}`);
});
