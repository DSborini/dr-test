const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/calculate', );

app.get('/painting', );

app.post('/painting', );

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));