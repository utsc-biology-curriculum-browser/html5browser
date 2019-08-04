(function(){
    "use strict";

    window.addEventListener('load', function(){
        let currentPorgramId = '';
        // Click event for each program
        api.onProgramUpdate(info =>  {
            // Togger display
            currentPorgramId = info.id;
            document.querySelector('header > h1').style.display = 'none';
            document.querySelector('.progname').innerHTML = info.name;
            document.querySelector('.nav').style.display = 'grid';
            document.querySelector('.programs').style.display = 'none';
            let infomation = document.querySelector('.infomation');
            infomation.innerHTML = info.introduction;
            infomation.style.display = 'block';
            document.querySelector('.courses').style.display = 'block';
            // TODO: update map and course info
            //console.log(info.map);
            graphBuilder.build('map', info.map.nodes, info.map.edges, info.id=='sp-ibs' || info.id=='mj-cbs');
        });

        function newElememt(tag, inner, parent, strongTitle=null) {
            let ele = document.createElement(tag);
            if(strongTitle) {
                ele.innerHTML = `<strong>${strongTitle}: </strong>${inner}`
            } else {
                ele.innerHTML = inner;
            }
            parent.appendChild(ele);
        }

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
            //
        });

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
            
        });

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

