/*jshint esversion: 6 */
let api = (function(){
    var module = {};

    function request(method, url, data, callback) {
        let req = new XMLHttpRequest();
        req.onload = () => {
            if(req.status !== 200) callback(req.status + ": " + req.responseText, null);
            else callback(null, JSON.parse(req.responseText));
        };
        req.open(method, url, true);
        if (!data) req.send();
        else{
            req.setRequestHeader('Content-Type', 'application/json');
            req.send(JSON.stringify(data));
        }
    }
    
    module.getProgramInfo = function(id){
        request('GET', '/api/programs/' + id + '/', null, (error, res) => {
            if(error) notifyErrorListener(error);
            else notifyProgramListener(res);
        });
    };

    module.getCourseInfo = function(id) {
        request('GET', '/api/courses/' + id + '/', null, (error, res) => {
            if(error) notifyErrorListener(error);
            else notifyCourseListener(res);
        });
    }

    let programListener = [];

    function notifyProgramListener(info) {
        programListener.forEach((i) => {
            i(info);
        });
    }

    // register a program listener
    module.onProgramUpdate = function(listener){
        programListener.push(listener);
    };

    let courseListener = [];

    function notifyCourseListener(info) {
        courseListener.forEach((i) => {
            i(info);
        });
    }

    // register a program listener
    module.onCourseUpdate = function(listener){
        courseListener.push(listener);
    };

    // Error listeners
    let errorListener = [];

    function notifyErrorListener(error) {
        errorListener.forEach((i) => {
            i(error);
        });
    }

    module.onErrorUpdate = (listener) => {
        errorListener.push(listener);
    };

    
    return module;
})();

module.exports = api;