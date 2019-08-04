const app = require('./webbase.js');
const {programsInfo, mapInfo, coursesInfo} = require('../data');

app.get('/api/programs/:id/', (req, res, next) => {
    // Get program information
    let progId = req.params.id;
    console.log(progId);
    if(programsInfo[progId]) {
        res.json({
            id: progId,
            name: programsInfo[progId].name,
            introduction: programsInfo[progId].intro,
            map: mapInfo[progId], // TODO: construct map
            yearInfo: {} // TODO: construct course info
        });
    } else {
        return res.status(400).end("Program Id " + progId + " is not a valid program ID!");
    }
});


app.get('/api/courses/:id/', (req, res, next) => {
    let courseId = req.params.id;
    console.log("Find course: " + courseId);
    if(coursesInfo[courseId]) {
        res.json({
            id: courseId,
            info: coursesInfo[courseId]
        });
    } else {
        return res.status(400).end("Course Id " + courseId + " is not a valid course ID!");
    }
});
