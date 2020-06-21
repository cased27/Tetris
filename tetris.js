
function addElement () { 
    for(var i = 0; i <= 200; i++){
        var div = document.querySelectorAll("div.grid");
        var newDiv = document.createElement("div");
        newDiv.append(div);
    } return newDiv.childNodes;
}

