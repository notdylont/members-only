require('dotenv').config();
const path = require('node:path');
const express = require('express');
const router = require('./routes/index');

const app = express();
const assetsPath = path.join(__dirname, 'public');
const { PORT = 3000 } = process.env;

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
