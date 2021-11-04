const express = require('express');
const bodyParser = require('body-parser');
const paintingsController = require('../controllers/paintingsController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/paintings', paintingsController.getValidationOrPacks);

// app.post('/painting', );

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));