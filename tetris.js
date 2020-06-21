let grid = document.querySelector("div.grid");

function addElements () { 
    for(var i = 0; i < 200; i++){
        let newDiv = document.createElement("div");
        grid.append(newDiv);
        newDiv.className = "square";
    } 
}

addElements();
