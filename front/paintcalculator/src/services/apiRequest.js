const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

const validateWallsInfo = async (wallsInfo) => {
  api.get('/paintings/', { data: wallsInfo } )
  .then(function (response) {
    console.log(response.status);
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
    return error.response.data;
  });
};

export default validateWallsInfo;
