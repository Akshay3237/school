const db = require('../config/db');

const getAllSchools = (callback) => {
  db.query('SELECT * FROM schools', callback);
};

const createSchool = (school, callback) => {
  const query = 'INSERT INTO schools SET ?';
  db.query(query, school, callback);
};

module.exports = { getAllSchools, createSchool };
