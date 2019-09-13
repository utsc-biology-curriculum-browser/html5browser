(function(){
    "use strict";

    const api = require('./api.js');
    const graphBuilder = require('./graphBuilder.js');

    function processMsg(msg) {
        let lst = msg.split('\n');
        let ans="";
        for(let i=0; i<lst.length; i++) {
            ans += `<p>${lst[i]}</p>`;
        }
        return ans;
    }

    function constructDisplay(yearInfo) {
        // Grid for display
        let display = null;
        display = document.getElementById('display');
        if(display) {
            display.innerHTML = '';
        } else {
            display = document.createElement('div');
            display.id = "display"
            document.querySelector('main').appendChild(display);
        }
        // Map place
        let map = document.createElement('div');
        map.id = 'map';
        display.appendChild(map);
        // Side notes place
        let sides = document.createElement('div');
        sides.id = 'sides';
        display.appendChild(sides);
        for(let i=0; i<yearInfo.length; i++) {
            let label = yearInfo[i].label;
            let msg = yearInfo[i].msg;
            let ct = document.createElement('div');
            ct.className = 'ct'
            sides.appendChild(ct);
            let bt = document.createElement('button');
            bt.className = "bt";
            bt.addEventListener('click', e => {
                e.preventDefault();
            });
            bt.innerHTML = label;
            ct.appendChild(bt);
            let nt = document.createElement('div');
            nt.innerHTML = processMsg(msg);
            nt.className = 'msg';
            ct.appendChild(nt);
        }
    }

    function newElememt(tag, inner, parent, strongTitle=null) {
        let ele = document.createElement(tag);
        if(strongTitle) {
            ele.innerHTML = `<strong>${strongTitle}: </strong>${inner}`
        } else {
            ele.innerHTML = inner;
        }
        parent.appendChild(ele);
    }

    function displayErrorerr(err) {
        let infomation = document.querySelector('.infomation');
        infomation.innerHTML = err;
    }

    window.addEventListener('load', function(){
        let currentPorgramId = '';

        let programUrl = null;

        // Display until fully load
        document.querySelector('body').style.display = "block";

        // Program name click event
        document.querySelector('.progname').addEventListener('click', e => {
            e.preventDefault();
            window.open(programUrl, '_blank');
        })

        // When switch program
        api.onProgramUpdate(info =>  {
            // Togger display
            currentPorgramId = info.id;
            document.querySelector('header > h1').style.display = 'none';
            let progname = document.querySelector('.progname');
            progname.innerHTML = info.name;
            document.querySelector('.nav').style.display = 'grid';
            document.querySelector('.programs').style.display = 'none';
            programUrl = info.url;
            let infomation = document.querySelector('.infomation');
            infomation.innerHTML = info.introduction;
            infomation.style.display = 'block';
            document.querySelector('.courses').style.display = 'block';
            
            // Construct html for display
            constructDisplay(info.yearInfo);
            
            graphBuilder.build('map', info.map.nodes, info.map.edges, info.id=='sp-ibs' || info.id=='mj-cbs');
        });

        // When select a course
        api.onCourseUpdate(res => {
            let infomation = document.querySelector('.infomation');
            infomation.innerHTML = ''; // clean html
            // title
            newElememt('h3', res.info['title'], infomation);
            // Summary
            newElememt('p', res.info['summary'], infomation);
            // Prerequisite
            if(res.info['Prerequisite']) {
                newElememt('p', res.info['Prerequisite'], infomation, 'Prerequisite');
            }
            // Corequisite
            if(res.info['Corequisite']) {
                newElememt('p', res.info['Corequisite'], infomation, 'Corequisite');
            }
            // Execlusion
            if(res.info['Execlusion']) {
                newElememt('p', res.info['Execlusion'], infomation, 'Execlusion');
            }
            // Recommend Preparation
            if(res.info['Recommend Preparation']) {
                newElememt('p', res.info['Recommend Preparation'], infomation, 'Recommend Preparation');
            }
            infomation.querySelector('h3').addEventListener('click', e => {
                e.preventDefault();
                window.open('https://utsc.calendar.utoronto.ca/course/'+ res.id, '_blank');
            })
        });

        // When api error
        api.onErrorUpdate(displayErrorerr);

        // Program list on click event
        let programs = document.querySelectorAll("li");
        programs.forEach((program) => {
            program.addEventListener('click', (e) => {
                api.getProgramInfo(program.id);
            });
        }); 

        // ---- Return to home ------
        document.querySelector(".home").addEventListener("click", (e) => {
            e.preventDefault();
            currentPorgramId = '';
            document.querySelector('header > h1').style.display = 'block';
            document.querySelector('.progname').innerHTML = '';
            document.querySelector('.nav').style.display = 'none';
            document.querySelector('.programs').style.display = 'block';
            document.querySelector('.courses').style.display = 'none';
            document.querySelector('.infomation').innerHTML = '';
            // Distroy display
            let display = document.getElementById('display');
            display.parentNode.removeChild(display);
        });

        // Navigate
        document.querySelector(".next").addEventListener("click", (e) => {
            let next = document.getElementById(currentPorgramId).nextElementSibling;
            if(!next) {
                next = document.querySelector('ul').firstElementChild;
            }
            api.getProgramInfo(next.id);
        });

        document.querySelector(".prev").addEventListener("click", (e) => {
            let prev = document.getElementById(currentPorgramId).previousElementSibling;
            if(!prev) {
                prev = document.querySelector('ul').lastElementChild;
            }
            api.getProgramInfo(prev.id);
        });
    });
}())

