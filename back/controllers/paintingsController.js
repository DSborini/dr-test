const paitingsService = require('../services/paintingsService');

const getValidationOrPacks = async (req, res) => {
  console.log('olha o body ai');
  console.log(req.body);
  const valOrPack = await paitingsService.getValidationOrPacks(req.body);
  if (valOrPack.err) return res.status(valOrPack.err.status).json(valOrPack.err.message);
  return res.status(valOrPack.resp.status).json(valOrPack.resp.content);
};

module.exports = {
  getValidationOrPacks,
};