const axios = require('axios');

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    nome: 'Victor',
    sobrenome: 'Nogueira'
  }
});