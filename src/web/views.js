const app = require('./webbase.js');
const {programsInfo} = require('../data');

app.get('/', (req, res, next) => {
    let progs  = [];
    for(let id in programsInfo) {
        progs.push({
            id: id,
            name: programsInfo[id].name,
            order: programsInfo[id].order
        });
    }
    progs.sort((i,j) => {
        return i.order < j.order ? -1 : 1;
    });
    res.render('index', {
        title: process.env.WEB_NAME || "UTSC Biology Curriculum Map",
        header: process.env.HOME_HEADER || "UTSC Department of Biological Sciences",
        programs: progs
    });
});