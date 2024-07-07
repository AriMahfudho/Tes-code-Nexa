const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

db.sequelize.sync().then(() => {
  console.log('Database connected');
});

require('./routes/auth.routes')(app);
require('./routes/customer.routes')(app);
require('./routes/transaction.routes')(app);
require('./routes/barang.routes')(app);

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
