(function(){
    "use strict";

    // Change display for a program
    function updateProgramName(name) {
        document.querySelector('.progname').innerHTML = name;
    }

    function toProgram(name, index) {
        updateProgramName(name);
        // Togger display
        document.querySelector('header > h1').style.display = 'none';
        document.querySelector('.nav').style.display = 'grid';
        document.querySelector('.programs').style.display = 'none';
        document.querySelector('.courses').style.display = 'block';
    }

    window.addEventListener('load', function(){
        // Click event for each program
        let programs = document.querySelectorAll("li");
        programs.forEach((program) => {
            program.addEventListener('click', (e) => {
                let name = program.innerHTML;
                toProgram(name);
            });
        }); 

        document.querySelector(".home").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector('header > h1').style.display = 'block';
            document.querySelector('.nav').style.display = 'none';
            document.querySelector('.programs').style.display = 'block';
            document.querySelector('.courses').style.display = 'none';
            
        });

        function findProgramIndex() {
            let id = 0;
            let result = -1;
            programs.forEach((program) => {
                if(program.innerHTML === document.querySelector('.progname').innerHTML) {
                    result = id;
                }
                id = id + 1;
            });
            return result;
        }

        document.querySelector(".prev").addEventListener("click", (e) => {
            //let id = parseInt(document.querySelector('.progname').id.slice(8));
            let id = findProgramIndex();
            let index = (id === 0) ? (programs.length - 1) : (id - 1);
            console.log(id + " : " + index);
            updateProgramName(programs[index].innerHTML, index);
            /*if(id === 0) {
                id = programs.length - 1;
            } else {
                id = id - 1;
            }*/

        });

        document.querySelector(".next").addEventListener("click", (e) => {
            let id = findProgramIndex();
            let index = (id === (programs.length - 1)) ? 0 : (id + 1);
            console.log(id + " : " + index);
            updateProgramName(programs[index].innerHTML, index);
            /*if(id === 0) {
                id = programs.length - 1;
            } else {
                id = id - 1;
            }*/

        });
    });
}())

