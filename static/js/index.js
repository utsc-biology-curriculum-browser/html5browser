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
            let progdesc = document.querySelector('.progdesc');
            progdesc.innerHTML = info.introduction;
            progdesc.style.display = 'block';
            document.querySelector('.coursedesc').style.display = 'none';
            document.querySelector('.courses').style.display = 'block';
            // TODO: update map and course info
            console.log(info.map);
            graphBuilder.build('map', info.map.nodes, info.map.edges);
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
            document.querySelector('.progdesc').innerHTML = '';
            document.querySelector('.coursedesc').innerHTML = '';
            
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

