const axios = require('axios');

const validateWallsInfo = async (wallsInfo) => {
  const resp = await axios({
    method: 'get',
    url: 'http://localhost:3001/paintings/',
    data: wallsInfo,
  });

  return resp;
};

export default validateWallsInfo;