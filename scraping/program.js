const rp = require('request-promise');
const cheerio = require('cheerio');
const {domainName, programs} = require('./base.js');
const fs = require('fs');
const path = require('path');

/* Get program introduction from html*/
function getProgramIntro(html, introIndex) {
    let intro = cheerio('.field-name-field-intro > .field-items > .field-item > p', html).eq(introIndex).text();
    return intro;
}

async function init(programInfo) {
    for(let key in programs) {
        let val = programs[key];
        // Initialize program information
        programInfo[key] = {};
        // TODO: add program name
        let html = await rp(domainName + val.url);
        programInfo[key].intro = getProgramIntro(html, val.introIndex);
    }
    return programInfo;
};

init({})
    .then((result) => {
        fs.writeFileSync(path.join(__dirname, 'data/programsInfo.json'), JSON.stringify(result));
    })
    .catch(err => { console.log(err.message); });
