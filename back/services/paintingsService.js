const Joi = require('joi');
const paintingsModel = require('../models/paintingsModel');
const { proportionError, minWallHeightError, reqContentError } = require('../public/error');
const { succefulValidation } = require('../public/success');
const { 
  doorInfo,
  windowInfo,
  inkCapacityPerLiter,
  inkPackaging, 
  minWallHeightDoor,
  addonsMaxArea,
} = require('../public/utils');

const checkWallQuantity = (walls) => {
  if (walls.length > 1) return false;
  return true;
};

const getPercentage = (totalValue, percentage) => {
  const value = totalValue * (percentage / 100);
  return value;
};

const wallSchema = Joi.object({
  wall: Joi.string().required(),
  width: Joi.number().min(1).max(15).required(),
  height: Joi.number().min(1).max(15).required(),
  door: Joi.boolean().required(),
  window: Joi.boolean().required(),
});

const validateWallsInfo = (walls) => {
  let status = succefulValidation;
  walls.forEach((wall) => {
    const { error } = wallSchema.validate(wall);
    const wallArea = wall.width * wall.height;
    const addonsArea = doorInfo.area + windowInfo.area;
    if (error) status = reqContentError;
    if (wall.door && wall.window && addonsArea > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.door && doorInfo.area > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.window && windowInfo.area > getPercentage(wallArea, addonsMaxArea)) status = proportionError;
    if (wall.door && wall.height < (minWallHeightDoor + doorInfo.height)) status = minWallHeightError;
  });

  return status;
};

const calculateTotalArea = (walls) => {
  let totalArea = 0;
  walls.forEach((wall) => {
    console.log(totalArea);
    totalArea += wall.width * wall.height;
    if (wall.door) totalArea -= doorInfo.area;
    if (wall.window) totalArea -= windowInfo.area;
  });

  return totalArea;
};

const calculateNecessaryPack = (totalArea) => {
  const packs = Object.values(inkPackaging);
  let litersNeeded = totalArea / inkCapacityPerLiter.squareMeters;
  const packsNeeded = {};
  console.log(litersNeeded);
  
  packs.forEach((value) => packsNeeded[value] = 0);
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
  if (isOnlyValidation) return succefulValidation; 

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

// const teste = [
//   {
//     wall: 'wall1',
//     width: 1,
//     height: 2.21,
//     door: true,
//     window: true,
//   },
// ];

// console.log(JSON.stringify(getValidationOrPacks(teste)));
// console.log(calculateNecessaryPack(calculateTotalArea(teste)));
// console.log(calculateTotalArea(teste));