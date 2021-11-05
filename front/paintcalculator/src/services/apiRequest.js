const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

const validateWallsInfo = async (wallsInfo) => {
  api.get('/paintings/', { data: wallsInfo } )
  .then(function (response) {
    return { data: response.data, status: response.status };
  })
  .catch(function (error) {
    return { data: error.response.data, status: error.response.status };
  });
};

const teste = [
  {
    "wall": "wall1",
    "width": 10000,
    "height": 10,
    "door": 0,
    "window": 0
  },
  {
    "wall": "wall2",
    "width": 10,
    "height": 10,
    "door": 0,
    "window": 1
  },
  {
    "wall": "wall3",
    "width": 10,
    "height": 10,
    "door": 0,
    "window": 0
  }
]

export default validateWallsInfo;
