const Joi = require('joi');
const paintingsModel = require('../models/paintingsModel');

const { 
  doorInfo,
  windowInfo,
  inkCapacityPerLiter,
  inkPackaging, 
  minWallHeightDoor,
  addonsMaxArea,
} = require('../public/utils');

const checkWallQuantity = (walls) => {
  if (walls.length !== 4) return false;
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
  let isValid = true;
  walls.forEach((wall) => {
    const { error } = wallSchema.validate(wall);
    const wallArea = wall.width * wall.height;
    const addonsArea = doorInfo.area + windowInfo.area;
    if (error) isValid = false;
    if (wall.door && wall.window && addonsArea > getPercentage(wallArea, 50)) isValid = false;
    if (wall.door && doorInfo.area > getPercentage(wallArea, 50)) isValid = false;
    if (wall.door && wall.height < (minWallHeightDoor + doorInfo.height)) isValid = false;
  });

  return isValid;
};

const calculateTotalArea = (walls) => {
  let totalArea = 0;
  walls.forEach((wall) => {
    totalArea += wall.width * wall.height;
    if (wall.door) totalArea -= doorInfo.doorArea;
    if (wall.window) totalArea -= windowInfo.windowArea;
  });

  return totalArea;
};

const calculateNecessaryPack = (totalArea) => {
  const packs = Object.values(inkPackaging);
  let litersNeeded = totalArea / inkCapacityPerLiter.squareMeters;
  const packsNeeded = {};
  
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

  if (!infoIsValid) return infoIsValid;
};

// const teste = [
//   {
//     wall: 'wall1',
//     width: 15,
//     height: 15,
//     door: true,
//     window: true,
//   },
//   {
//     wall: 'wall2',
//     width: 15,
//     height: 15,
//     door: false,
//     window: false,
//   },
//   {
//     wall: 'wall3',
//     width: 15,
//     height: 15,
//     door: false,
//     window: false,
//   },
//   {
//     wall: 'wall4',
//     width: 15,
//     height: 15,
//     door: false,
//     window: false,
//   },
// ];

validateWallsInfo(teste);
