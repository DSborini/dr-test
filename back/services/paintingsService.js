const Joi = require('joi');
// const paintingsModel = require('../models/paintingsModel');
const { succefulValidation } = require('../public/success');
const { 
  proportionError, 
  minWallHeightError, 
  reqContentError, 
  reqQuantError, 
} = require('../public/error');
const { 
  doorInfo,
  windowInfo,
  inkCapacityPerLiter,
  inkPackaging, 
  minWallHeightDoor,
  addonsMaxArea,
} = require('../public/utils');

const checkWallQuantity = (walls) => {
  if (walls.length === 4) return false;
  if (walls.length === 1) return succefulValidation;
  return reqQuantError;
};

const getPercentage = (totalValue, percentage) => {
  const value = totalValue * (percentage / 100);
  return value;
};

const wallSchema = Joi.object({
  wall: Joi.number().required(),
  width: Joi.number().min(1).max(15).required(),
  height: Joi.number().min(1).max(15).required(),
  door: Joi.number().integer().required(),
  window: Joi.number().integer().required(),
});

const validateWallsInfo = (walls) => {
  let status = succefulValidation;
  walls.forEach((wall) => {
    const { error } = wallSchema.validate(wall);
    const wallArea = wall.width * wall.height;
    const addonsArea = doorInfo.area * wall.door + windowInfo.area * wall.window;
    if (error) status = reqContentError;
    if (wall.door > 0 && wall.window > 0 && addonsArea > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.door > 0 && doorInfo.area * wall.door > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.window > 0 && windowInfo.area * wall.window > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.door && wall.height < (minWallHeightDoor + doorInfo.height)) status = minWallHeightError;
  });

  return status;
};

const calculateTotalArea = (walls) => {
  let totalArea = 0;
  walls.forEach((wall) => {
    totalArea += wall.width * wall.height;
    if (wall.door > 0) totalArea -= doorInfo.area * wall.door;
    if (wall.window > 0) totalArea -= windowInfo.area * wall.window;
  });

  return totalArea;
};

const calculateNecessaryPack = (totalArea) => {
  const packs = Object.values(inkPackaging);
  let litersNeeded = totalArea / inkCapacityPerLiter.squareMeters;
  const packsNeeded = {};
  
  packs.forEach((value) => { packsNeeded[value] = 0; });
  packs.forEach((pack) => {
    while (litersNeeded >= pack) {
      packsNeeded[pack] += 1;
      litersNeeded -= pack;
    }
  });

  return packsNeeded;
};

const getValidationOrPacks = (walls) => {
  const infoIsValid = validateWallsInfo(walls);
  const isOnlyValidation = checkWallQuantity(walls);

  if (infoIsValid.err) return infoIsValid;
  if (isOnlyValidation) return isOnlyValidation; 

  return {
    resp: {
      status: 200,
      content: {
        necessaryPacks: calculateNecessaryPack(calculateTotalArea(walls)),
        calculatedObject: walls,
      },
  } };
};

module.exports = {
  getValidationOrPacks,
};