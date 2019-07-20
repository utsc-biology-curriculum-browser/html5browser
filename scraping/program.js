const rp = require('request-promise');
const cheerio = require('cheerio');
const {domainName, programs} = require('./base.js');
const fs = require('fs');
const path = require('path');
const {matchCourses} = require('./parser.js');

/* Get program introduction from html*/
function getProgramIntro(html, introIndex, stripLen) {
    let intro = cheerio('.field-name-field-intro > .field-items > .field-item > p', html).eq(introIndex).text();
    if(stripLen > 0) {
        intro = intro.substring(0, intro.length - stripLen);
    }
    return intro;
}

/*For each program, get courses and group them based on years*/
function getCoursesForEachYear(html) {
    let courses = [];
    let current = null;
    cheerio('.field-name-body > .field-items > .field-item > p', html).each((index, ele) => {
        // Get current cheerio element
        let element = cheerio(ele);
        // Try to identify a new year
        let em = element.find('em');
        if(em.length > 0) {
            let label = em.eq(0).text();
            if(label.includes("Year")) { // Find a new year
                if(current) courses.push(current);
                current={
                    "label": label,
                    "courses": []
                };
            }
        }
        // When in a year
        if(current) {
            let ans = matchCourses(element.text());
            current["courses"] = current["courses"].concat(ans);
        }
    });
    // Ensure contains all infomation
    if(current) courses.push(current);
    return courses;
}

async function init(programInfo) {
    for(let key in programs) {
        let val = programs[key];
        // Initialize program information
        programInfo[key] = {"name":val.name};
        // TODO: add program name
        let html = await rp(domainName + val.url);
        // 1. Get program introductions
        programInfo[key].intro = getProgramIntro(html, val.introIndex, val.stripEndNum);
        // 2. Get program course list by year
        programInfo[key].courses = getCoursesForEachYear(html);
    }
    return programInfo;
};

init({})
    .then((result) => {
        fs.writeFileSync(path.join(__dirname, 'data/programsInfo.json'), JSON.stringify(result));
    })
    .catch(err => { console.log(err.message); });

/*--- for test ---
async function test(programInfo) {
    //let html = await rp("https://utsc.calendar.utoronto.ca/specialist-program-conservation-and-biodiversity-science");
    let html = await rp("https://utsc.calendar.utoronto.ca/specialist-program-human-biology-science");
    // Test code
    getCoursesForEachYear(html);
    return programInfo;
};

test({})
    .then((result) => {
        console.log('-----END-----')
    })
    .catch(err => { console.log(err.message); });*/