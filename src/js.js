document.addEventListener("DOMContentLoaded", function () {

    var number = 16; // default value
    let container = document.querySelector('.container');
    let color = false;

    // create the grid structure
    function CreateContainer() {
        container.style.gridTemplateColumns = `repeat(${number}, 2fr)`;
        container.style.gridTemplateRows = `repeat(${number}, 2fr)`;
    }

     // create the grid elements
    function grid() {
        document.querySelector('#msg').style.display = 'none';
        for (let i = 1; i <= (number*number) ; i++) {
            let div = document.createElement('div');
            div.className = 'item';
            div.id = 'item';
            container.append(div);
        }
        // add a mouseover event on each of them and change the class
        document.querySelectorAll('#item').forEach(item =>  {
            item.addEventListener('mouseover', function() {    
                // if random:
                if (color) {
                    let a = Math.floor(Math.random() * 256);
                    let b = Math.floor(Math.random() * 256);
                    let c = Math.floor(Math.random() * 256);
                    item.style.backgroundColor = `rgb(${a}, ${b}, ${c})`}
                else {
                    item.style.backgroundColor = 'rgb(177, 177, 177)';
                }
              }); 
            });
    }


    // add a click event on the clear button to reset the grid to the original state (in terms of colors). The grid structure remains the same as the one selected by the user (or the default one if no new grid structure by the user)
    document.querySelector('#clear').addEventListener('click', () => {
        document.querySelectorAll('#item').forEach(item => {
            item.className = 'item';
            item.style.backgroundColor = '';
        });
    });
        
    // add a click event on the "ask" button to ask the user the number to create a new grid.
    // if valid, the current grid is remove to create a new one. Otherwise, a message appears.
    // if prompt empty or null, the current grid is still displayed - no back to default in that case
    document.querySelector('#ask').addEventListener('click', () => {
        number = prompt("Enter a number (from 1 to 100)");
        remove(document.querySelector('#msg'));

        if (number =="" || number == null) {
                console.log('display current grids');
        }
        else if (isNaN(number) || number> 100 || number <=0) {
            document.querySelector('#msg').style.display = 'block';
            let msg_text = document.createElement('h4');
            msg_text.textContent = 'Enter a valid number, between 1 and 100';
            document.querySelector('#msg').append(msg_text);
        }
        else {
            remove(container);
            CreateContainer();
            grid();
        }

    });
    
    // activate or disable the random color feature
    document.querySelector('#color').addEventListener('click', () => {
        if(color) {
            color = false;
            document.querySelector('#color').textContent = "Enable the random colors";
            document.querySelector('#color').style.backgroundColor = 'rgb(241, 241, 241)';
        }
        else {
            color=true;
            document.querySelector('#color').textContent = "Disable the random colors";
            document.querySelector('#color').style.backgroundColor = 'rgb(255, 255, 255)';

        }
    });


    // remove the grid
    function remove(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }

    // default state when loading the page
    CreateContainer();
    grid();

});