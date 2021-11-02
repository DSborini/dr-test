const Joi = require('joi');
const paintingsModel = require('../models/paintingsModel');
const doorInfo = require('../public/utils');
const windowInfo = require('../public/utils');

const validateWallQuantity = (walls) => {
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
    const { error } = Joi.validate(wall, wallSchema);
    const wallArea = wall.width * wall.height;
    if (error) isValid = false;
    
    switch (wall) {
      case (wall.door && wall.window):
        const addonsArea = doorInfo.doorArea + windowInfo.windowArea;
        if (addonsArea > getPercentage(wallArea, 50)) isValid = false;
        break; 
      case (wall.door):
        if (doorInfo.area > getPercentage(wallArea, 50)) isValid = false;
        break;
      case (wall.window):
        if (windowInfo.area > getPercentage(wallArea, 50)) isValid = false; 
      }
    }
  }
      }
      

    } 
  });
  return isValid;
};

const validate

const calculateTotalArea = (walls) => {
  let totalArea = 0;
  walls.forEach((wall) => {
    totalArea += wall.width * wall.height;
    if (wall.door) totalArea -= doorInfo.doorArea;
    if (wall.window) totalArea -= windowInfo.windowArea;
  });
  return totalArea;
};
