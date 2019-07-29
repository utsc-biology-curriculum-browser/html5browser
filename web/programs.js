const app = require('./webbase.js');
const {programsInfo} = require('../data');

app.get('/api/programs/:id/', (req, res, next) => {
    // Get program information
    let progId = req.params.id;
    if(programsInfo[progId]) {
        res.json({
            id: progId,
            name: programsInfo[progId].name,
            introduction: programsInfo[progId].intro,
            map: {}, // TODO: construct map
            yearInfo: {} // TODO: construct course info
        });
    } else {
        return res.status(400).end("Program Id " + progId + " is not a valid program ID!");
    }
});

