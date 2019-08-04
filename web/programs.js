const app = require('./webbase.js');
const {programsInfo, mapInfo} = require('../data');

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

