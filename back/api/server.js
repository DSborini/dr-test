const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const paintingsController = require('../controllers/paintingsController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());

app.post('/paintings', paintingsController.getValidationOrPacks);

// app.post('/painting', );

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));