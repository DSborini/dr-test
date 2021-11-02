// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const registerNewPainting = async (wallsInfo, calculatedInk) => {
  const db = await connection.getConnection();
  const newPainting = { wallsInfo, calculatedInk };
  const paintingCreated = await db.collection('paintings').insertOne(newPainting);

  return paintingCreated.ops[0];
};

const getAllPaintings = async () => {
  const db = await connection.getConnection();
  const allPaintings = await db.collection('paintings').find().toArray();

  return allPaintings;
};

module.exports = { 
  registerNewPainting,
  getAllPaintings,
};