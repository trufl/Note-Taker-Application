const express = require('express');
const routes = require('./routes');

const PORT =  3001;    //process.env.PORT ||
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () =>
  console.log(`App listening`)
);