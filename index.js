(function(){
    "use strict";

    // Change display for a program
    function updateProgramName(name) {
        document.querySelector('#progname').innerHTML = name;
    }

    function toProgram(name) {
        updateProgramName(name);
        // Togger display
        document.querySelector('header > h1').style.display = 'none';
        document.querySelector('header > div').style.display = 'grid';
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
    });
}())

