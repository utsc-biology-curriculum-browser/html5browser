/**
Module to load program and course data
*/
const fs = require('fs');
const path = require('path');

// Info about programs
module.exports.programsInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'programsInfo.json')));
// Info about courses
module.exports.coursesInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'coursesInfo.json')));
