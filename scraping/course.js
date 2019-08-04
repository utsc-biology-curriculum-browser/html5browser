const rp = require('request-promise');
const cheerio = require('cheerio');
const {domainName, courseRules} = require('./base.js');
const fs = require('fs');
const path = require('path');

const urlPrefix = domainName + 'course/';

const programs = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/programsInfo.json')));

function addEntryText(obj, key, entry) {
    if(entry.length > 0) {
        obj[key] = entry.text().trim();
    }
}

/*Get information for a course from the course info page*/
function getCourseInfo(html) {
    let courseInfo = {};
    // Get title and summary
    let title = cheerio('#page-title', html).text().trim();
    let summary = cheerio(".field-name-body > .field-items > .field-item > p", html).text().trim();
    courseInfo["title"] = title;
    courseInfo["summary"] = summary;
    // Get prerequisite, corequisite, and execlusion
    let prereq = cheerio(courseRules.prerequisite, html);
    addEntryText(courseInfo, "Prerequisite", prereq);
    let coreq = cheerio(courseRules.corequisite, html);
    addEntryText(courseInfo, "Corequisite", coreq);
    let execlu = cheerio(courseRules.execlusion, html);
    addEntryText(courseInfo, "Execlusion", execlu);
    let recommend = cheerio(courseRules.recommend, html);
    addEntryText(courseInfo, "Recommend Preparation", recommend);
    return courseInfo;
}

function courserPromise(id) {
    return new Promise((resolve, reject) => {
        let url = urlPrefix + id;
        rp(url)
            .then(html => {
                let ans = {};
                ans[id] = getCourseInfo(html);
                resolve(ans);
            })
            .catch(err => {
                reject(err);
            });
        });
}

function init() {
    // Get all courses that need to be consided.
    let allCourses = [];
    let checked = new Set();
    let cnt = 0;
    for(let key in programs) {
        let coursesInYear = programs[key].coursesInYear;
        coursesInYear.forEach(year => {
            let courses = year.courses;
            courses.forEach(id => {
                cnt = checked.has(id) ? (cnt) : (cnt + 1);
                // Only consider new, not-ruled-out courses
                if(!checked.has(id)) {
                    checked.add(id);
                    // Add a promise that will scrap info for this course
                    allCourses.push(courserPromise(id));
                }
            });
        });
    }
    console.log(cnt);
    return allCourses;
}

Promise.all(init())
    .then(values => {
        let result = {};
        for(let i=0; i<values.length; i++) {
            obj = values[i];
            for(let id in obj) {
                result[id] = obj[id];
            }
        }
        fs.writeFileSync(path.join(__dirname, 'data/courseInfo.json'), JSON.stringify(result, null, 2));
    })
    .catch(err => { console.log(err.message); });
/*--- Code for Test----
async function test() {
    let ans = {};
    let courseId = "PHYA10H3";
    let url = urlPrefix + courseId;
    let html = await rp(url);
    ans[courseId] = getCourseInfo(html);
    return ans;
}

test()
    .then(result => {
        console.log(result);
        console.log('-----END-----');
    })
    .catch(error => {
        console.log(error.message);
    });*/