const express = require('express');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const port = 3000;

app.use('/list-view', listViewRouter);

app.use('/list-edit', listEditRouter);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
