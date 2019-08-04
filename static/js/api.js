/*jshint esversion: 6 */
var api = (function(){
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
            if(error) console.log('There is an error when get program info'); //notifyErrorListener(error);
            else notifyProgramListener(res);
        });
    };

    module.getCourseInfo = function(id) {
        request('GET', '/api/courses/' + id + '/', null, (error, res) => {
            if(error) console.log('There is an error when get course info'); //notifyErrorListener(error);
            else notifyCourseListener(res);
        });
    }

    let programListener = [];

    function notifyProgramListener(info) {
        programListener.forEach((i) => {
            i(info);
        });
        //notifyErrorListener(null);
    }

    // register a program listener
    module.onProgramUpdate = function(listener){
        programListener.push(listener);
        //module.autoRefresh('noimg', 0);
    };

    let courseListener = [];

    function notifyCourseListener(info) {
        courseListener.forEach((i) => {
            i(info);
        });
        //notifyErrorListener(null);
    }

    // register a program listener
    module.onCourseUpdate = function(listener){
        courseListener.push(listener);
        //module.autoRefresh('noimg', 0);
    };

    /*let cmtListener = [];

    function notifyCommentListener(imageId, page=0) {
        cmtListener.forEach((i) => {
            module.getComments(imageId, page, i);
        });
    }
    // register an comment listener
    // to be notified when a comment is added or deleted to an image
    module.onCommentUpdate = function(listener){
        cmtListener.push(listener);
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

    // User listener
    let userListener = [];

    function getUser(){
        return document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    function notifyUserListener(username) {
        userListener.forEach((i) => {
            i(username);
        });
        notifyErrorListener(null);
    }

    module.onUserUpdate = (listener) => {
        userListener.push(listener);
        //listener(getUser());
    };

    module.autoRefresh = (gallery, imageId, page) => {
        // If currently there is no image, get newest image
        if(imageId === 'noimg') module.getNewest(gallery);
        // Else, check whether the current image can be found
        else {
            request('GET', '/api/images/'+ imageId + '/', null, (error, res) => {
                if(error) {
                    //notifyErrorListener(error);
                    // if current image has been deleted, display the newest image
                    if(error.includes('404')) {
                        module.getNewest(gallery);
                    }
                } else {
                    // Else if found current image, update current comments page
                    if(!page) page = 0;
                    notifyCommentListener(imageId, page);
                }
            });
        }
    };*/
    
    return module;
})();