const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 10000,
});

// const validateWallsInfo = async (wallsInfo) => {
//   const resp = await api.get('/paintings/', { data: wallsInfo } )
  
//   try {
//     return resp;
//   } catch (error) {
//     return error;
//   }
// };

const validateWallsInfo = async (wallsInfo) => {
  const resp = await api.post('paintings/', wallsInfo )
  .then(function ({ data, status}) {
    return { data, status};
  })
  .catch(function ({ response }) {
    return { data: response.data, status: response.status };
  });

  return resp;
};

const teste = [
  {
    "wall": "wall1",
    "width": 10,
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
  },
  {
    "wall": "wall4",
    "width": 10,
    "height": 10,
    "door": 0,
    "window": 0
  }
]

export default validateWallsInfo;
