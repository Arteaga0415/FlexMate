const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const router = require('./routers') 

const app = express();
const PORT = 3333;

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});