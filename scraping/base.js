/**
Information needed for web scraping.
*/
const fs = require('fs');
const path = require('path');

// Domain name for UTSC calendar
exports.domainName = "https://utsc.calendar.utoronto.ca/";

// Infor needed for scrap program list
exports.programs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/rbPrograms.json')));
// Infor needed for scrap course information
exports.courseRules = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/rbCourses.json')));
